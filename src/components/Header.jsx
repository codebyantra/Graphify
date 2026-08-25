import { useEffect, useState } from "react";

export default function Header({ scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-shell">
        <button className="brand" onClick={() => go("top")} aria-label="Back to top">
          <span className="brand-mark">g</span>
          <span className="brand-copy"><strong>graphify<span>.</span></strong><small>creative studio</small></span>
        </button>

        <nav className="desktop-nav" aria-label="Primary">
          {["about", "services", "work", "contact"].map((id) => (
            <button key={id} onClick={() => go(id)}>{id[0].toUpperCase() + id.slice(1)}</button>
          ))}
        </nav>

        <button className="talk desktop-talk" onClick={() => go("contact")}>Let's talk <span>↗</span></button>

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span>
        </button>
      </div>

      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {["about", "services", "work", "contact"].map((id) => (
          <button key={id} onClick={() => go(id)}>{id[0].toUpperCase() + id.slice(1)}</button>
        ))}
      </div>
    </header>
  );
}
