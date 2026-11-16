import ChaiArt, { Spark } from "./ChaiArt";
const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-note">a little chai. a little clarity.</div>
    <h1 id="hero-title">
      Every cup.
      <br />
      <span>Counted.</span>
    </h1>
    <p className="hero-copy">
      Your chai habit, one sip at a time.
      <br />
      Track your cups, caffeine &amp; what it all costs.
    </p>
    <a href="#track" className="pill pill-light hero-cta">
      Let’s log a chai <span aria-hidden="true">↘</span>
    </a>
    <div className="hero-art">
      <div className="art-orbit" />
      <ChaiArt className="hero-cup" />
      <Spark className="spark spark-one" />
      <Spark className="spark spark-two" />
      <span className="hand-note">
        your daily
        <br />
        cup of clarity
      </span>
    </div>
    <span className="edge-note">FOR THE LOVE OF CHAI</span>
    <div className="hero-bottom">
      <span>ONE CUP AT A TIME</span>
      <span aria-hidden="true">SCROLL TO SIP ↓</span>
    </div>
  </section>
);
export default Hero;
