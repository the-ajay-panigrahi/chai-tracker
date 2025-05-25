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
    <>
      <section className="bg-slate-700 py-10 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-3xl font-bold text-white">Statistic's</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full rounded-xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <h4 className="text-lg text-gray-500 group-hover:text-orange-600 font-semibold transition-colors duration-200">
                Active Caffeine Level
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <p className="text-gray-700 text-lg font-medium">
                  <span className="text-3xl font-bold text-black group-hover:text-orange-600 transition-colors duration-200">
                    {caffeineLevel}
                  </span>{" "}
                  <span className="group-hover:text-orange-600">mg</span>
                </p>
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
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <h4 className="text-lg text-gray-500 group-hover:text-orange-600 font-semibold transition-colors duration-200">
                Daily Caffeine
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl">☕</span>
                <p className="text-gray-600">
                  <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                    {stats.daily_caffeine}
                  </span>{" "}
                  <span className="group-hover:text-orange-600">mg</span>
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <h4 className="text-lg text-gray-500 group-hover:text-orange-600 font-semibold transition-colors duration-200">
                Avg cup of Chai's
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍵</span>
                <p className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                  {stats.average_teas}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <h4 className="text-lg text-gray-500 group-hover:text-orange-600 font-semibold transition-colors duration-200">
                Daily Cost (₹)
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl">💰</span>
                <p className="text-gray-600">
                  <span className="text-xs group-hover:text-orange-600">₹</span>{" "}
                  <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                    {stats.daily_cost}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <h4 className="text-lg text-gray-500 group-hover:text-orange-600 font-semibold transition-colors duration-200">
                Total Cost (₹)
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl">💸</span>
                <p className="text-gray-600">
                  <span className="text-xs group-hover:text-orange-600">₹</span>{" "}
                  <span className="text-2xl font-bold text-black group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200">
                    {stats.total_cost}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-600 py-10 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Table />
        </div>
      </section>
    </>
  );
};

export default Statistics;
