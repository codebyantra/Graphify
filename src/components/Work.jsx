const works = [
  ["brand-art","MELT","PACKAGING SYSTEM","Melt / Packaging system","2026"],
  ["social-art",<>AFTER<br />HOURS</>,"LAUNCH STORY","After Hours / Launch story","2026"],
  ["north-art","NORTHLINE","STUDIO SITE","Northline / Studio site","2025"],
];
export default function Work({ Reveal, scrollToSection }) {
  return (
    <section className="work section-dark" id="work">
      <div className="container">
        <Reveal as="div" className="section-head">
          <div><p className="eyebrow">Selected work</p><h2>Good work<br /><span>gets remembered.</span></h2></div>
          <button className="work-link" onClick={() => scrollToSection("contact")}>Start a project ↗</button>
        </Reveal>
        <div className="work-grid">
          {works.map(([cls,title,small,meta,year]) => (
            <Reveal as="article" className="work-card" key={meta}>
              <div className={`work-image ${cls}`}><span>{title}</span><small>{small}</small></div>
              <div className="work-meta"><h3>{meta}</h3><span>{year}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
