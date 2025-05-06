import {
  calculateChaiStats,
  calculateCurrentCaffeineLevel,
  chaiConsumptionHistory,
  statusLevels,
} from "../utils";

import StatisticCard from "./StatisticsCard";
import Table from "./Table";

const Statistics = () => {
  const stats = calculateChaiStats(chaiConsumptionHistory);
  const caffeineLevel = calculateCurrentCaffeineLevel(chaiConsumptionHistory);
  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";

  return (
    <section className="bg-slate-700 py-10 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-3xl font-bold text-white">Statistic's</h2>
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatisticCard fullWidth title="Active Caffeine Level">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <p className="text-gray-700 text-lg font-medium">
                  <span className="text-3xl font-bold text-black group-hover:text-orange-600 transition-colors duration-200">
                    {caffeineLevel}
                  </span>{" "}
                  <span className="group-hover:text-orange-600">mg</span>
                </p>
              </div>
              <span
                className="text-md font-semibold px-7 py-2 rounded-full capitalize group-hover:font-bold ml-2"
                style={{
                  color: statusLevels[warningLevel].color,
                  backgroundColor: statusLevels[warningLevel].background,
                }}
              >
                {warningLevel}
              </span>
            </div>
            <p className="text-lg text-gray-600 group-hover:text-gray-800">
              {statusLevels[warningLevel].description}
            </p>
          </StatisticCard>

          <StatisticCard title="Daily Caffeine">
            <div className="flex items-center gap-3">
              <span className="text-3xl">☕</span>
              <p className="text-gray-600">
                <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                  {stats.daily_caffeine}
                </span>{" "}
                <span className="group-hover:text-orange-600">mg</span>
              </p>
            </div>
          </StatisticCard>

          <StatisticCard title="Avg cup of Chai's">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍵</span>
              <p className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                {stats.average_teas}
              </p>
            </div>
          </StatisticCard>

          <StatisticCard title="Daily Cost (₹)">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💰</span>
              <p className="text-gray-600">
                <span className="text-xs group-hover:text-orange-600">₹</span>{" "}
                <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                  {stats.daily_cost}
                </span>
              </p>
            </div>
          </StatisticCard>

          <StatisticCard title="Total Cost (₹)">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💸</span>
              <p className="text-gray-600">
                <span className="text-xs group-hover:text-orange-600">₹</span>{" "}
                <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                  {stats.total_cost}
                </span>
              </p>
            </div>
          </StatisticCard>
        </div>

        {/* Table */}
        <div className="mt-10">
          <Table />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
