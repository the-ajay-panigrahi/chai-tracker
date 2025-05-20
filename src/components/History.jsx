import { useState } from "react";
import {
  calculateCurrentCaffeineLevel,
  chaiConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";

import ChaiInfoModal from "../components/ChaiInfoModal";

const History = () => {
  const [selectedChai, setSelectedChai] = useState(null);

  const handleChaiClick = (utcTime) => {
    const chai = chaiConsumptionHistory[utcTime];
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
    <section className="bg-slate-800 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
    
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
          <span className="text-2xl sm:text-3xl">🕒</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight text-center sm:text-left">
            Chai Consumption History
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-300 mb-8 italic text-center sm:text-left">
          Click on any cup to view caffeine details and cost breakdown.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
          {Object.keys(chaiConsumptionHistory)
            .sort((a, b) => b - a)
            .map((utcTime, index) => (
              <div
                className="flex items-center justify-center"
                key={index}
                onClick={() => handleChaiClick(utcTime)}
              >
                <img
                  src="/chai-logo.png"
                  alt="Chai"
                  className="rounded-2xl p-2 bg-white shadow-md hover:shadow-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer w-20 h-20 object-contain"
                />
              </div>
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
