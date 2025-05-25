import { useContext } from "react";
import { getTopThreeTeas } from "../utils/index.js";
import { AuthContext } from "../utils/AuthContext.jsx";

const Table = () => {
  const { globalData } = useContext(AuthContext);
  return (
    <div className="overflow-hidden rounded-xl bg-slate-700 border border-slate-600 shadow-lg transition-shadow duration-300 hover:shadow-white/30">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-6 bg-slate-800 border-b border-slate-600 justify-center">
        <span className="text-2xl sm:text-3xl text-orange-300 animate-pulse">
          📋
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide text-center">
          Top 3 Most Consumed Teas
        </h3>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full table-fixed text-center text-white text-base sm:text-lg">
          <thead className="bg-slate-800 text-orange-400 uppercase tracking-wide text-sm sm:text-base">
            <tr>
              <th className="w-1/3 px-4 py-4 font-semibold text-lg sm:text-xl">
                Chai Name
              </th>
              <th className="w-1/3 px-4 py-4 font-semibold text-lg sm:text-xl">
                Purchase Count
              </th>
              <th className="w-1/3 px-4 py-4 font-semibold text-lg sm:text-xl">
                Total %
              </th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeTeas(globalData).map((chai, chaiIndex) => (
              <tr
                key={chaiIndex}
                className="transition duration-200 hover:bg-slate-950 border-b border-slate-600"
              >
                <td className="px-4 py-4 text-white font-medium text-lg sm:text-xl text-center">
                  <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <span className="text-xl">
                      {chaiIndex === 0 ? "🏆" : "🍵"}
                    </span>
                    <span>{chai.teaName}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-white font-semibold text-lg sm:text-xl text-center">
                  {chai.count}
                </td>
                <td className="px-4 py-4 text-white font-semibold text-lg sm:text-xl text-center">
                  {chai.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
