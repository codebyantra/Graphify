import { useEffect, useRef, useState, forwardRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

const Reveal = forwardRef(function Reveal({ children, className="", direction, ...props }, ref) {
  const Tag = props.as || "div";
  const { as, ...rest } = props;
  return <Tag ref={ref} className={`${className} ${direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal"}`} {...rest}>{children}</Tag>;
});

function Counter({ target }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1000;
      const tick = (now) => {
        const progress = Math.min((now-start)/duration, 1);
        const eased = 1 - Math.pow(1-progress, 3);
        setValue(Math.floor(target*eased));
        if(progress<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, {threshold:.7});
    observer.observe(el);
    return ()=>observer.disconnect();
  }, [target]);
  return <strong ref={ref}>{value}<span>+</span></strong>;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  return <>
    <div id="preloader" className={loading ? "" : "hide"}>
      <div className="loader-logo"><span className="mark">g</span><div><strong>graphify<span>.</span></strong><small>creative studio</small></div></div>
      <div className="loader-line"><i></i></div>
    </div>
    <main id="top">
      <Header scrollToSection={scrollToSection}/>
      <Hero scrollToSection={scrollToSection} Reveal={Reveal}/>
      <Services Reveal={Reveal}/>
      <About Reveal={Reveal} Counter={Counter}/>
      <Work Reveal={Reveal} scrollToSection={scrollToSection}/>
      <Process Reveal={Reveal}/>
      <Contact Reveal={Reveal}/>
      <Footer scrollToSection={scrollToSection}/>
    </main>
  </>;
}
