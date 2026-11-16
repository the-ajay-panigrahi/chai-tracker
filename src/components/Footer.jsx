import { Spark } from "./ChaiArt";
const Footer = () => (
  <footer className="site-footer">
    <div className="shell">
      <div className="footer-poster">
        <Spark />
        <span className="eyebrow">CHAI TRACKER</span>
        <p>
          Here’s to the
          <br />
          next cup.
        </p>
        <a className="pill pill-light" href="#track">
          Log a little moment <span aria-hidden="true">↗</span>
        </a>
        <Spark className="footer-spark" />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Chai Tracker</span>
        <div>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
        <span>BREW. SIP. REPEAT.</span>
      </div>
    </div>
  </footer>
);
export default Footer;
