import {
  calculateCurrentCaffeineLevel,
  chaiConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";

const History = () => {
  return (
    <section className="bg-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🕒</span>
          <h2 className="text-3xl font-bold text-white">
            Chai Consumption History
          </h2>
        </div>

        <p className="text-lg text-white mb-6 italic">
          Hover over each cup to view details like caffeine and cost.
        </p>

        {/* History Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {Object.keys(chaiConsumptionHistory)
            .sort((a, b) => b - a)
            .map((utcTime, index) => {
              const chai = chaiConsumptionHistory[utcTime];
              const timeSince = timeSinceConsumption(utcTime);
              const original = getCaffeineAmount(chai.name);
              const remaining = calculateCurrentCaffeineLevel({
                [utcTime]: chai,
              });

              const tooltip = `${chai.name} | ${timeSince} | ₹${chai.cost} | ${remaining}mg / ${original}mg`;

              return (
                <div className="flex items-center justify-center">
                  <img
                    src="/chai-logo.png"
                    alt="Chai"
                    key={index}
                    title={tooltip}
                    className="rounded-xl p-2 shadow-lg hover:shadow-lg hover:scale-150 transition-transform duration-200 cursor-pointer w-20 h-20 object-contain "
                  />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default History;
