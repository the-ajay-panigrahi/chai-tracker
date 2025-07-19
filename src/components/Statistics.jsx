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
      <section className="bg-gray-50 py-10 transition-colors duration-300 dark:bg-gray-900">
        <div className="max-w-screen-md mx-auto px-4 md:max-w-[700px]">
          <div className="mb-8 flex items-center gap-3">
            <i className="fas fa-chart-bar text-3xl text-orange-500 dark:text-orange-400"></i>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Statistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="col-span-full rounded-xl bg-white p-6 shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg hover:border-orange-500 hover:scale-[1.01] transition-all duration-200 cursor-pointer
                            dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:border-orange-400"
            >
              <h4 className="text-lg text-gray-600 group-hover:text-orange-600 font-semibold transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-orange-400">
                Active Caffeine Level
              </h4>
              <div className="flex items-center gap-3">
                <i className="fas fa-bolt text-3xl text-yellow-500"></i>
                <p className="text-gray-700 text-lg font-medium dark:text-gray-200">
                  <span className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 dark:text-white dark:group-hover:text-orange-400">
                    {caffeineLevel}
                  </span>{" "}
                  <span className="group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    mg
                  </span>
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
              <p className="text-lg text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200">
                {statusLevels[warningLevel].description}
              </p>
            </div>

            <div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg hover:border-orange-500 hover:scale-[1.01] transition-all duration-200 cursor-pointer
                            dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:border-orange-400"
            >
              <h4 className="text-lg text-gray-600 group-hover:text-orange-600 font-semibold transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-orange-400">
                Daily Caffeine
              </h4>
              <div className="flex items-center gap-3">
                <i className="fas fa-mug-hot text-3xl text-orange-500"></i>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200 dark:text-white dark:group-hover:text-orange-400">
                    {stats.daily_caffeine}
                  </span>{" "}
                  <span className="group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    mg
                  </span>
                </p>
              </div>
            </div>

            <div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg hover:border-orange-500 hover:scale-[1.01] transition-all duration-200 cursor-pointer
                            dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:border-orange-400"
            >
              <h4 className="text-lg text-gray-600 group-hover:text-orange-600 font-semibold transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-orange-400">
                Avg cup of Chai's
              </h4>
              <div className="flex items-center gap-3">
                <i className="fas fa-coffee text-3xl text-green-500"></i>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200 dark:text-white dark:group-hover:text-orange-400">
                  {stats.average_teas}
                </p>
              </div>
            </div>

            <div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg hover:border-orange-500 hover:scale-[1.01] transition-all duration-200 cursor-pointer
                            dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:border-orange-400"
            >
              <h4 className="text-lg text-gray-600 group-hover:text-orange-600 font-semibold transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-orange-400">
                Daily Cost (₹)
              </h4>
              <div className="flex items-center gap-3">
                <i className="fas fa-rupee-sign text-3xl text-emerald-500"></i>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="text-xs group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    ₹
                  </span>{" "}
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200 dark:text-white dark:group-hover:text-orange-400">
                    {stats.daily_cost}
                  </span>
                </p>
              </div>
            </div>

            <div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg hover:border-orange-500 hover:scale-[1.01] transition-all duration-200 cursor-pointer
                            dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:border-orange-400"
            >
              <h4 className="text-lg text-gray-600 group-hover:text-orange-600 font-semibold transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-orange-400">
                Total Cost (₹)
              </h4>
              <div className="flex items-center gap-3">
                <i className="fas fa-wallet text-3xl text-blue-500"></i>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="text-xs group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    ₹
                  </span>{" "}
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 group-hover:text-3xl transition-all duration-200 dark:text-white dark:group-hover:text-orange-400">
                    {stats.total_cost}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-10 transition-colors duration-300 dark:bg-gray-800">
        <div className="max-w-screen-md mx-auto px-4 md:max-w-[700px]">
          <Table />
        </div>
      </section>
    </>
  );
};

export default Statistics;
