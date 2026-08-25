import p1 from "../assets/process-01.png";
import p2 from "../assets/process-02.png";
import p3 from "../assets/process-03.png";
import p4 from "../assets/process-04.png";

const steps=[["01","Discover","Understand the brief, the ambition, and the opportunity.",p1],["02","Strategy","Find the sharpest route from idea to impact.",p2],["03","Create","Make, test, refine, and bring the work to life.",p3],["04","Deliver","Ship the details that make the whole thing sing.",p4]];
export default function Process({Reveal}){
 return <section className="process container">
  <Reveal as="div" className="center-head"><p className="eyebrow">How we work</p><h2>A clear process.<br /><em>Better outcomes.</em></h2></Reveal>
  <div className="process-grid">{steps.map(([n,t,d,img])=><Reveal as="article" className="process-step" key={n}>
   <div className="process-icon"><img src={img} alt={t}/></div><span className="process-number">{n}</span><h3>{t}</h3><p>{d}</p>
  </Reveal>)}</div>
 </section>
}
