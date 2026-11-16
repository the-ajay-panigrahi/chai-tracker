import { useContext } from "react";
import {
  calculateChaiStats,
  calculateCurrentCaffeineLevel,
  statusLevels,
} from "../utils/index.js";

import Table from "./Table";
import { AuthContext } from "../utils/AuthContext.jsx";

const Statistics = () => {
  const { globalData } = useContext(AuthContext);
  const stats = calculateChaiStats(globalData);
  const caffeineLevel = calculateCurrentCaffeineLevel(globalData);
  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
        ? "moderate"
        : "high";

  return (
    <section id="statistics" className="statistics section-space">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / THE BIG PICTURE</span>
            <h2>
              Your chai,
              <br />
              by the numbers.
            </h2>
          </div>
          <p>
            Every cup adds up.
            <br />
            Here’s a look at your habit.
          </p>
        </div>
        <div className="stats-layout">
          <div className="active-caffeine">
            <span className="eyebrow">ACTIVE CAFFEINE LEVEL</span>
            <div className="caffeine-value">
              {caffeineLevel}
              <span>mg</span>
            </div>
            <span
              className="status-pill"
              style={{
                color: statusLevels[warningLevel].color,
                backgroundColor: statusLevels[warningLevel].background,
              }}
            >
              {warningLevel}
            </span>
            <p>{statusLevels[warningLevel].description}</p>
            <span className="small-label">BASED ON YOUR LAST 48 HOURS</span>
          </div>
          <dl className="stat-grid">
            {[
              ["Daily caffeine", stats.daily_caffeine, "mg"],
              ["Average cups per day", stats.average_teas, "cups"],
              ["Daily cost", `₹${stats.daily_cost}`, ""],
              ["Total cost", `₹${stats.total_cost}`, ""],
            ].map(([label, value, unit]) => (
              <div className="stat" key={label}>
                <dt>{label}</dt>
                <dd>
                  {value}
                  <span>{unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Table />
      </div>
    </section>
  );
};
export default Statistics;
