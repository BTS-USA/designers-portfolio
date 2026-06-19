"""One-off conversion: PDF -> PNG (PyMuPDF) and PPTX -> PNG (PowerPoint COM).

Usage:
    python scripts/convert_presentations.py
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

PDF_SRC = Path(r"c:/Users/Lokesh.Pimple/Downloads/SusagadGoa_logo.pdf")
PPTX_SRC = Path(r"c:/Users/Lokesh.Pimple/Downloads/How to make a lemonade - Lokesh Pimple.pptx")
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "work" / "presentations"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def _save_jpeg(pix, target: Path, *, quality: int = 82) -> None:
    """Convert a PyMuPDF pixmap to a JPEG to keep file sizes friendly."""
    from PIL import Image

    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(str(target), "JPEG", quality=quality, optimize=True, progressive=True)


def _find_whitespace_splits(
    pil_img,
    *,
    white_threshold: int = 245,
    min_gap_height_ratio: float = 0.012,
) -> list[int]:
    """Return y-pixel positions where a tall image can be split at clear gaps.

    Splits at the vertical center of each near-white horizontal band that is
    taller than ``min_gap_height_ratio * image_height`` pixels. Skips gaps at
    the very top/bottom edges.
    """
    import numpy as np
    from PIL import Image

    gray = np.asarray(pil_img.convert("L"))
    h = gray.shape[0]
    row_min = gray.min(axis=1)
    near_white = row_min >= white_threshold
    min_gap_h = max(8, int(h * min_gap_height_ratio))

    splits: list[int] = []
    i = 0
    while i < h:
        if not near_white[i]:
            i += 1
            continue
        start = i
        while i < h and near_white[i]:
            i += 1
        end = i
        gap_len = end - start
        if gap_len >= min_gap_h and start > 0 and end < h:
            splits.append((start + end) // 2)
    return splits


def convert_pdf(
    pdf_path: Path,
    prefix: str,
    *,
    zoom: float = 1.25,
    split_tall_pages: bool = True,
    tall_aspect_ratio: float = 2.0,
) -> list[Path]:
    import pymupdf
    from PIL import Image

    doc = pymupdf.open(str(pdf_path))
    matrix = pymupdf.Matrix(zoom, zoom)
    out: list[Path] = []

    for page_idx, page in enumerate(doc, start=1):
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        full = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

        is_tall = split_tall_pages and (full.height / full.width) >= tall_aspect_ratio
        slices: list[Image.Image]
        if is_tall:
            split_points = _find_whitespace_splits(full)
            boundaries = [0, *split_points, full.height]
            slices = [
                full.crop((0, boundaries[i], full.width, boundaries[i + 1]))
                for i in range(len(boundaries) - 1)
            ]
            slices = [s for s in slices if s.height >= 40]
        else:
            slices = [full]

        page_tag = "" if len(doc) == 1 else f"-p{page_idx}"
        for slice_idx, img in enumerate(slices, start=1):
            suffix = (
                f"{page_tag}-{slice_idx:02d}" if len(slices) > 1 or page_tag else ""
            )
            stem = f"{prefix}{suffix}" if suffix else f"{prefix}-{page_idx:02d}"
            target = OUT_DIR / f"{stem}.jpg"
            img.save(str(target), "JPEG", quality=82, optimize=True, progressive=True)
            out.append(target)

    doc.close()
    return out


def convert_pptx(pptx_path: Path, prefix: str) -> list[Path]:
    import comtypes.client
    from PIL import Image

    tmp_dir = OUT_DIR / f"_tmp_{prefix}"
    tmp_dir.mkdir(parents=True, exist_ok=True)

    powerpoint = comtypes.client.CreateObject(
        "PowerPoint.Application", dynamic=True
    )
    try:
        deck = powerpoint.Presentations.Open(str(pptx_path), -1, 0, 0)
        try:
            deck.SaveAs(str(tmp_dir.resolve()), 18)  # 18 = ppSaveAsPNG
        finally:
            deck.Close()
    finally:
        powerpoint.Quit()

    rendered_root = tmp_dir
    nested = [p for p in tmp_dir.iterdir() if p.is_dir()]
    if nested and not any(p.suffix.lower() == ".png" for p in tmp_dir.iterdir()):
        rendered_root = nested[0]

    def _slide_sort_key(p: Path):
        stem = p.stem
        for marker in ("Slide", "slide"):
            if stem.startswith(marker):
                try:
                    return (0, int(stem[len(marker):]))
                except ValueError:
                    pass
        return (1, stem)

    slides = sorted(
        (p for p in rendered_root.iterdir() if p.suffix.lower() == ".png"),
        key=_slide_sort_key,
    )
    out: list[Path] = []
    for i, slide in enumerate(slides, start=1):
        target = OUT_DIR / f"{prefix}-{i:02d}.jpg"
        if target.exists():
            target.unlink()
        with Image.open(slide) as img:
            img.convert("RGB").save(
                str(target), "JPEG", quality=88, optimize=True, progressive=True
            )
        slide.unlink()
        out.append(target)

    for leftover in list(rendered_root.iterdir()):
        leftover.unlink()
    if rendered_root != tmp_dir:
        rendered_root.rmdir()
    tmp_dir.rmdir()
    return out


def main() -> int:
    print(f"Output dir: {OUT_DIR}")

    if not PDF_SRC.exists():
        print(f"!! PDF not found: {PDF_SRC}", file=sys.stderr)
        return 1
    if not PPTX_SRC.exists():
        print(f"!! PPTX not found: {PPTX_SRC}", file=sys.stderr)
        return 1

    pdf_out = convert_pdf(PDF_SRC, prefix="susagad-goa-logo")
    print(f"PDF -> {len(pdf_out)} page(s):")
    for p in pdf_out:
        print(f"   {p.name} ({p.stat().st_size // 1024} KB)")

    pptx_out = convert_pptx(PPTX_SRC, prefix="lemonade")
    print(f"PPTX -> {len(pptx_out)} slide(s):")
    for p in pptx_out:
        print(f"   {p.name} ({p.stat().st_size // 1024} KB)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
