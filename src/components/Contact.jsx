import { useState } from "react";
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = "xqcFVFkcLDGlD87Ye";
const SERVICE_ID = "service_rtqz1ms";
const TEMPLATE_ID = "template_qtc1mb6";

export default function Contact({ Reveal }) {
  const [status, setStatus] = useState("No pitch deck required. Just the idea.");
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setStatus("Sending your enquiry...");
    try {
      if (PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
        emailjs.init({ publicKey: PUBLIC_KEY });
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
        setStatus("✓ Enquiry sent successfully. We'll get back to you soon.");
        form.reset();
      } else {
        await new Promise(r => setTimeout(r, 700));
        setStatus("✓ Demo submitted. Add your EmailJS credentials for real email delivery.");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally { setSending(false); }
  }

  const isSuccess = status.startsWith("✓");
  const isError = status.startsWith("Something");

  return <section className="contact-section" id="contact">
    <div className="container contact-grid">
      <Reveal as="div" className="contact-card" direction="left">
        <div className="contact-ring"></div>
        <p className="eyebrow dark">Have an idea?</p><h2>Let's build<br />it.</h2>
        <p>Bring the rough idea. Leave with a sharper signal. Tell us what you're working on.</p>
        <div className="contact-details"><strong>+91 8448315825</strong><strong>+91 9717759325</strong><strong>hello@graphify.studio</strong></div>
      </Reveal>
      <Reveal as="div" className="contact-form" direction="right">
        <form onSubmit={submit} id="contactForm">
          <div className="form-row"><label><span>Your name</span><input name="name" required /></label><label><span>Your email</span><input name="email" type="email" required /></label></div>
          <label><span>Phone number</span><input name="phone" type="tel" required /></label>
          <label><span>Company / Brand</span><input name="company" /></label>
          <label><span>Service required</span><select name="service" required><option value="">Choose a service</option><option>Logo & Brand Identity</option><option>Creative Social Content</option><option>Reels & Video Editing</option><option>Social Media Management</option><option>Web & App Development</option></select></label>
          <label><span>Tell us a little about the project</span><textarea name="message" required></textarea></label>
          <button className="send-btn" type="submit" disabled={sending}><span>{sending ? "Sending..." : "Send message"}</span><b>{sending ? "•" : "↗"}</b></button>
          <p className={`form-note ${isSuccess ? "success" : ""} ${isError ? "error" : ""}`}>{status}</p>
        </form>
      </Reveal>
    </div>
  </section>
}
