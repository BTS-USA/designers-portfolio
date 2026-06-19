import { useEffect } from "react";
import Lenis from "lenis";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Work } from "@/sections/Work";
import { Expertise } from "@/sections/Expertise";
import { Process } from "@/sections/Process";
import { Team } from "@/sections/Team";
import { Testimonial } from "@/sections/Testimonial";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-ink-paper text-ink">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Expertise />
        <Team />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
