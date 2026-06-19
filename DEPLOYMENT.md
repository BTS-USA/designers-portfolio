# Deployment Guide — BTS Designers Portfolio (AWS S3 + CloudFront)

This document is written for the **IT / DevOps team** receiving the build artifact for the BTS Designers Mumbai portfolio. It covers a one-time AWS setup and the regular re-deploy workflow.

---

## What you've been handed

A folder named `dist/` produced by `npm run build`. It contains:

```
dist/
├── index.html              ← single entry point
├── assets/                 ← Vite-hashed JS, CSS, fonts (long-cache safe)
├── work/                   ← project screenshots + videos
├── team/                   ← designer photos
├── bts-logo.png
└── favicon.png
```

Approximate sizes:

| What | Size |
|---|---:|
| `index.html` + `assets/` (JS + CSS) | ~500 KB gzipped |
| `team/` (7 designer photos) | ~1.2 MB |
| `work/` (project screenshots + 2 MP4 videos) | **~95 MB** (the two MP4s are 91 MB combined — see note in "Cost" section below) |

The site is a **single-page React app (Vite build)**. There is **no client-side router**, so no URL rewrites are required. Anchor links (`#work`, `#team`, etc.) resolve in the browser from `/`.

---

## Hosting architecture

**S3 (private bucket) → CloudFront (HTTPS, edge cache) → public viewers.**

The S3 bucket should **not** be public. CloudFront uses Origin Access Control (OAC) to read from it. This is the AWS-recommended pattern for static sites in 2024+.

```
[viewer] → https://<dist>.cloudfront.net → [CloudFront] → [S3: bts-designers-portfolio]
                                                ↑
                                           (OAC signed)
```

---

## One-time AWS setup

### 1. Create the S3 bucket

| Setting | Value |
|---|---|
| Bucket name | `bts-designers-portfolio` (or any globally unique name) |
| Region | `ap-south-1` (Mumbai) — recommended given the team location |
| Block all public access | **ON** (default; leave it on) |
| Bucket versioning | Optional (useful for rollback) |
| Default encryption | SSE-S3 (default) |

```bash
aws s3api create-bucket \
  --bucket bts-designers-portfolio \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

aws s3api put-public-access-block \
  --bucket bts-designers-portfolio \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### 2. Create the CloudFront distribution

Recommended via Console first time:

1. **CloudFront → Create distribution**.
2. **Origin domain**: choose the S3 bucket from the dropdown (`bts-designers-portfolio.s3.ap-south-1.amazonaws.com`).
3. **Origin access**: select **Origin access control (OAC) — recommended** → **Create new OAC** → save defaults.
4. **Viewer protocol policy**: *Redirect HTTP to HTTPS*.
5. **Allowed HTTP methods**: *GET, HEAD*.
6. **Cache policy**: *CachingOptimized* (managed).
7. **Origin request policy**: leave blank.
8. **Response headers policy**: optional, *SecurityHeadersPolicy* recommended.
9. **WAF**: optional, can skip for v1.
10. **Default root object**: `index.html`.
11. **Custom error responses** — add **both** of these (so any 403/404 falls back to the SPA shell, future-proof for routes if added):
    - **403** → response page path `/index.html`, HTTP response code `200`, TTL `0`.
    - **404** → response page path `/index.html`, HTTP response code `200`, TTL `0`.
12. **Create distribution**.
13. AWS will prompt **"Copy the bucket policy snippet"** — copy it, then go to **S3 → bucket → Permissions → Bucket policy → Edit**, paste, save. The policy looks like:

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AllowCloudFrontServicePrincipal",
          "Effect": "Allow",
          "Principal": { "Service": "cloudfront.amazonaws.com" },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::bts-designers-portfolio/*",
          "Condition": {
            "StringEquals": {
              "AWS:SourceArn": "arn:aws:cloudfront::<account-id>:distribution/<distribution-id>"
            }
          }
        }
      ]
    }
    ```

14. Wait for the distribution status to flip from **Deploying** → **Enabled** (~5–10 min).

Note the **Distribution ID** (starts with `E…`) and the **Distribution domain name** (e.g. `d1abc23def4ghi.cloudfront.net`). Both are needed for deploys.

### 3. (Optional, later) Custom domain

When BTS is ready with a domain:

1. **AWS Certificate Manager → Request certificate** in **`us-east-1` (N. Virginia)**. CloudFront requires the cert in this region, regardless of where the S3 bucket lives.
2. Validate via DNS (CNAME the validation record in Route 53 or the registrar).
3. **CloudFront distribution → Edit settings → Alternate domain names** → add e.g. `bts.designers.example.com` and attach the ACM cert.
4. Add an **A-record (Alias)** in DNS pointing the domain to the CloudFront distribution domain.

### 4. IAM user for deploy automation

Create an IAM user (or role for CI) with this **least-privilege** policy. Replace `bts-designers-portfolio` and the CloudFront distribution ARN with the real values.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::bts-designers-portfolio"
    },
    {
      "Sid": "ReadWriteObjects",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::bts-designers-portfolio/*"
    },
    {
      "Sid": "InvalidateCDN",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::<account-id>:distribution/<distribution-id>"
    }
  ]
}
```

Store the access key + secret in your usual secrets manager.

---

## Uploading the `dist/` folder

These three commands need to be run **in order** so each set of files gets the correct `Cache-Control` header.

> **Why three commands?** Vite produces `dist/assets/*` files with content-hashed names (e.g. `index-abc123.js`). These never change for a given content, so we cache them at the edge for a year. Everything else (logos, photos, videos) gets a 1-day cache. `index.html` itself must never be cached so visitors always get the latest build.

### From a Windows machine (PowerShell)

```powershell
$bucket = "bts-designers-portfolio"
$dist   = "E1XXXXXXXXXXXX"

# 1. Hashed JS / CSS — immutable, 1 year
aws s3 sync .\dist\ s3://$bucket/ --delete `
  --exclude "*" --include "assets/*" `
  --cache-control "public, max-age=31536000, immutable"

# 2. Everything else (images, videos, logos, fonts) — 1 day
aws s3 sync .\dist\ s3://$bucket/ --delete `
  --exclude "index.html" --exclude "assets/*" `
  --cache-control "public, max-age=86400"

# 3. index.html — never cached
aws s3 cp .\dist\index.html s3://$bucket/index.html `
  --cache-control "no-cache, must-revalidate" `
  --content-type "text/html"

# 4. Invalidate the CloudFront edge cache
aws cloudfront create-invalidation --distribution-id $dist --paths "/*"
```

### From macOS / Linux (bash)

```bash
BUCKET="bts-designers-portfolio"
DIST="E1XXXXXXXXXXXX"

aws s3 sync ./dist/ s3://$BUCKET/ --delete \
  --exclude "*" --include "assets/*" \
  --cache-control "public, max-age=31536000, immutable"

aws s3 sync ./dist/ s3://$BUCKET/ --delete \
  --exclude "index.html" --exclude "assets/*" \
  --cache-control "public, max-age=86400"

aws s3 cp ./dist/index.html s3://$BUCKET/index.html \
  --cache-control "no-cache, must-revalidate" \
  --content-type "text/html"

aws cloudfront create-invalidation --distribution-id $DIST --paths "/*"
```

`--delete` on the first two commands cleans up files that no longer exist in the new build (e.g. old hashed bundles). The first 1,000 CloudFront invalidation paths per month are free; `--paths "/*"` counts as one.

---

## Verification checklist

After the first deploy:

- [ ] Open `https://<distribution-domain>.cloudfront.net` in a clean browser profile.
- [ ] Hard-refresh and check **DevTools → Network**:
  - `index.html` → `Cache-Control: no-cache, must-revalidate`
  - `assets/*.js`, `assets/*.css` → `Cache-Control: public, max-age=31536000, immutable`
  - `work/*`, `team/*` → `Cache-Control: public, max-age=86400`
- [ ] Scroll through all sections, open the Lightbox carousel on any "Work" card, open the mobile drawer at a narrow window (resize to ~375px).
- [ ] Confirm the "Let's talk" CTAs open a mail compose window to `prajakta.sagade@bts.com`.

---

## Re-deploy workflow

For every new build BTS sends you (a new `dist.zip`):

1. Unzip into your working directory (replacing the previous `dist/`).
2. Re-run the **4 commands above** (sync × 2, cp, invalidate).

That's it. No infrastructure changes, no DNS changes.

If BTS wants to automate this on every push to `main`, the same commands can run in a GitHub Actions workflow with `aws-actions/configure-aws-credentials@v4`. Happy to share that workflow file on request.

---

## Cost estimate (rough, for sizing)

For ~500 visits / month:

| Item | Cost |
|---|---|
| S3 storage (95 MB) | ~$0.03 / month |
| CloudFront egress (with the two large MP4s autoplay-streaming, ~91 MB / visit) | **~$3.50 / month** at 500 visits |
| CloudFront egress (after MP4 compression to ~3 MB each) | ~$0.10 / month |
| Route 53 hosted zone (only if custom domain via Route 53) | $0.50 / month |
| ACM certificate (only if custom domain) | Free |

**Recommendation**: BTS should re-encode `work/video-motion/embark-1.mp4` (60 MB) and `bank-1.mp4` (32 MB) to web-optimised H.264 at ≤3–5 MB each. Until that happens the CloudFront bill is dominated by those two files.

---

## Rollback

If a deploy breaks the site, the fastest rollback is to re-upload the previous `dist/` (BTS keeps a `dist/` archive per release). If bucket versioning was enabled in step 1, you can also restore individual files from the S3 console → bucket → **Show versions**.

---

## Security notes

- The S3 bucket is **private**; no public ACLs, no public bucket policy. CloudFront OAC is the only read path.
- All traffic is HTTPS (HTTP → HTTPS redirect at CloudFront).
- The site has **no backend**, **no cookies**, **no auth**. Forms route to `mailto:` only.
- Third-party requests at runtime: Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) for the typography stack. No analytics, no tracking pixels are bundled.

---

## Points of contact

- **Codebase / brand owner**: BTS Designers Mumbai (`prajakta.sagade@bts.com`)
- **Deploy method**: manual `aws s3 sync` from a workstation with the IAM credentials above

---

*Last updated: 2026-06-19. Built from commit on main; verify the file `dist/index.html` exists in the package before uploading.*
