
const EMAILJS_PUBLIC_KEY = "xqcFVFkcLDGlD87Ye";
const EMAILJS_SERVICE_ID = "service_rtqz1ms";
const EMAILJS_TEMPLATE_ID = "template_qtc1mb6";

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader?.classList.add("hide"), 1500);

  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".mobile-nav");
  const menuToggle = document.querySelector(".menu-toggle");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    menu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => scrollToSection(btn.dataset.scroll));
  });

  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));

  // Subtle mouse parallax for the hero artwork.
  const hero = document.querySelector(".hero");
  const visual = document.querySelector(".hero-visual");
  const ring = document.querySelector(".hero-ring");

  if (hero && visual && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", e => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      visual.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
      ring.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
    });
    hero.addEventListener("mouseleave", () => {
      visual.style.transform = "";
      ring.style.transform = "";
    });
  }

  // Animated counters
  const counters = document.querySelectorAll(".stats strong");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.textContent, 10);
      const suffix = el.textContent.includes("+") ? "+" : "";
      let start = 0;
      const duration = 1000;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.innerHTML = `${Math.floor(start + (target - start) * eased)}<span>${suffix}</span>`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.7 });
  counters.forEach(c => counterObserver.observe(c));

  // EmailJS enquiry form.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const button = form.querySelector(".send-btn");
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = "<span>Sending...</span><b>•</b>";
    status.className = "form-note";
    status.textContent = "Sending your enquiry...";

    try {
      if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        status.className = "form-note success";
        status.textContent = "✓ Enquiry sent successfully. We'll get back to you soon.";
        form.reset();
      } else {
        // Demo fallback so the static site still works before EmailJS is configured.
        await new Promise(resolve => setTimeout(resolve, 700));
        status.className = "form-note success";
        status.textContent = "✓ Demo submitted. Add your EmailJS credentials in script.js for real email delivery.";
        form.reset();
      }
    } catch (error) {
      console.error(error);
      status.className = "form-note error";
      status.textContent = "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
});