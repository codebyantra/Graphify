import img1 from "../assets/01-logo-brand-identity.png";
import img2 from "../assets/02-creative-social-content.png";
import img3 from "../assets/03-reels-video-editing.png";
import img4 from "../assets/04-social-media-management.png";
import img5 from "../assets/05-web-app-development.png";

const services = [
  ["01","Identity","Logo & Brand Identity","Distinctive systems that make your brand easy to remember.",img1],
  ["02","Content","Creative Social Content","Content that earns the pause, then keeps the conversation moving.",img2],
  ["03","Motion","Reels & Video Editing","Fast, sharp edits built around the story your audience should feel.",img3],
  ["04","Growth","Social Media Management","A sharper social presence, planned, produced, and consistently alive.",img4],
  ["05","Digital","Web & App Development","Digital experiences that look considered and work beautifully.",img5],
];

export default function Services({ Reveal }) {
  return (
    <section className="services section-dark" id="services">
      <div className="container">
        <Reveal as="div" className="section-head">
          <div><p className="eyebrow">What we do</p><h2>Creative services<br /><span>with a point of view.</span></h2></div>
          <p className="head-note">We turn rough ideas into tangible brand systems, memorable content, and digital experiences built to move people.</p>
        </Reveal>
        <div className="service-grid">
          {services.map(([num, cat, title, desc, img], i) => (
            <Reveal as="article" key={num} className={`service-card ${i % 2 ? "offset" : ""}`}>
              <span className="number">{num}</span><span className="plus">+</span>
              <img src={img} alt={title} className="service-icon" />
              <div><small>{cat}</small><h3>{title}</h3><p>{desc}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
