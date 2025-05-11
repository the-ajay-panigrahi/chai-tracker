import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  calculateCurrentCaffeineLevel,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";
import ChaiInfoModal from "../components/ChaiInfoModal";

const History = () => {
  const { globalData } = useAuth();
  const [selectedChai, setSelectedChai] = useState(null);

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
    <section className="bg-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🕒</span>
          <h2 className="text-3xl font-bold text-white">
            Chai Consumption History
          </h2>
        </div>

        <p className="text-lg text-white mb-6 italic">
          Click on each cup to view details like caffeine and cost.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {Object.keys(globalData)
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
                  className="rounded-xl p-2 shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-200 cursor-pointer w-20 h-20 object-contain"
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
