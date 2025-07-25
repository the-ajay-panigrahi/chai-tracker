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
    <section className="bg-gray-50 py-10 sm:py-12 transition-colors duration-300 dark:bg-gray-900">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 md:max-w-[700px]">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
          <i className="fas fa-history text-2xl sm:text-3xl text-orange-500 dark:text-orange-400"></i>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight text-center sm:text-left dark:text-white">
            Chai Consumption History
          </h2>
        </div>

        <p className="text-base sm:text-lg text-gray-600 mb-8 italic text-center sm:text-left dark:text-gray-300">
          Click on any cup to view caffeine details and cost breakdown.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
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
                  className="rounded-2xl p-2 bg-white shadow-md hover:shadow-orange-500 hover:scale-105 transition-all duration-300 cursor-pointer w-20 h-20 object-contain
                             dark:bg-gray-800 dark:shadow-sm dark:hover:shadow-orange-400"
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
