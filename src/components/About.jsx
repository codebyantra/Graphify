import aboutBg from "../assets/about-bg.png";

export default function About({ Reveal, Counter }) {
  return (
    <section className="about container" id="about">
      <Reveal as="div" className="about-image" direction="left">
        <div className="studio-placeholder" style={{backgroundImage:`url(${aboutBg})`}}>
          <div className="studio-word">GRAPHIFY</div>
          <div className="studio-orb"></div><div className="studio-orb two"></div>
          <span>CREATIVE<br />STUDIO</span>
        </div>
        <div className="years"><strong>10<span>+</span></strong><small>years of making</small></div>
      </Reveal>
      <Reveal as="div" className="about-copy" direction="right">
        <p className="eyebrow">About us</p>
        <h2>Creativity meets<br /><em>technology.</em></h2>
        <p className="body-copy">Graphify makes the things your audience touches, sees, and remembers. We build identity systems, content worlds, and digital experiences that keep a brand unmistakably itself.</p>
        <div className="stats">
          <div><Counter target={50} /><small>Happy clients</small></div>
          <div><Counter target={100} /><small>Projects delivered</small></div>
          <div><Counter target={5} /><small>Core services</small></div>
        </div>
      </Reveal>
    </section>
  );
}
