import { useEffect, useRef } from "react";

export default function Hero({ scrollToSection, Reveal }) {
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    if (!hero || !visual || !window.matchMedia("(pointer:fine)").matches) return;

    const move = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      visual.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
    };
    const leave = () => { visual.style.transform = ""; };
    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);
    return () => {
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg-image"></div>
      <Reveal as="div" className="hero-copy">
        <p className="eyebrow"><i></i> Creative studio / New Delhi</p>
        <h1>You dream it,<br /><em>we build it.</em></h1>
        <p className="hero-text">Brand systems, content, and digital experiences that give ambitious businesses a sharper signal.</p>
        <div className="hero-buttons">
          <button className="btn orange" onClick={() => scrollToSection("services")}>Our services <span>›</span></button>
          <button className="btn outline" onClick={() => scrollToSection("work")}>View our work</button>
        </div>
      </Reveal>

      <Reveal as="div" className="hero-visual" direction="right" ref={visualRef}>
        <div className="cards-glow"></div>
        <img className="hero-cards" src="/src/assets/hero-cards.png" alt="Graphify creative studio cards" />
      </Reveal>
      <div className="scroll-note">Scroll to explore<br /><b>↓</b></div>
    </section>
  );
}
