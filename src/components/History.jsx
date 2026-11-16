import { useState } from "react";
import {
  calculateCurrentCaffeineLevel,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";

import ChaiInfoModal from "../components/ChaiInfoModal";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const History = () => {
  const [selectedChai, setSelectedChai] = useState(null);
  const { globalData } = useContext(AuthContext);

  const handleChaiClick = (utcTime) => {
    const chai = globalData[utcTime];
    const timeSince = timeSinceConsumption(utcTime);
    const original = getCaffeineAmount(chai.name);
    const remaining = calculateCurrentCaffeineLevel({ [utcTime]: chai });

    setSelectedChai({
      name: chai.name,
      timeSince,
      cost: chai.cost,
      original,
      remaining,
    });
  };

  return (
    <section id="history" className="history section-space">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / THE CUP COLLECTION</span>
            <h2>
              A little history.
              <br />A lot of chai.
            </h2>
          </div>
          <p>
            Pick a cup to see its caffeine
            <br />
            details and cost breakdown.
          </p>
        </div>
        <div className="history-grid">
          {Object.keys(globalData)
            .sort((a, b) => b - a)
            .map((utcTime, index) => (
              <button
                className="history-entry"
                key={utcTime}
                onClick={() => handleChaiClick(utcTime)}
                aria-label={`View ${globalData[utcTime].name}, ${new Date(Number(utcTime)).toLocaleString()}`}
              >
                <span className="small-label">
                  CUP{" "}
                  {String(Object.keys(globalData).length - index).padStart(
                    2,
                    "0",
                  )}
                </span>
                <img src="/chai-logo.png" alt="" />
                <strong>{globalData[utcTime].name}</strong>
                <span className="history-date">
                  {new Date(Number(utcTime)).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  <span aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
        </div>
      </div>
      <ChaiInfoModal
        info={selectedChai}
        onClose={() => setSelectedChai(null)}
      />
    </section>
  );
};
export default History;
