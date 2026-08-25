export default function Footer({scrollToSection}) {
 return <footer><div className="footer-inner">
  <div className="footer-brand"><span className="brand-mark">g</span><span>© 2026 Graphify Creative Studio</span></div>
  <div className="footer-links"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a><button onClick={()=>scrollToSection("top")}>Back to top ↑</button></div>
 </div></footer>
}
