import { useContext } from "react";
import { getTopThreeTeas } from "../utils/index.js";
import { AuthContext } from "../utils/AuthContext.jsx";

const Table = () => {
  const { globalData } = useContext(AuthContext);
  return (
    <div
      className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow duration-300 hover:shadow-xl
                    dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:hover:shadow-lg"
    >
      <div
        className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-6 bg-gray-100 border-b border-gray-200 justify-center
                      dark:bg-gray-700 dark:border-gray-600"
      >
        <i className="fas fa-clipboard-list text-2xl sm:text-3xl text-orange-500 animate-pulse dark:text-orange-400"></i>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-wide text-center dark:text-white">
          Top 3 Most Consumed Teas
        </h3>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full table-fixed text-center text-gray-800 text-base sm:text-lg dark:text-gray-100">
          <thead className="bg-gray-100 text-orange-600 uppercase tracking-wide text-sm sm:text-base dark:bg-gray-700 dark:text-orange-400">
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
                className="transition duration-200 hover:bg-gray-50 border-b border-gray-200
                           dark:hover:bg-gray-700 dark:border-gray-600"
              >
                <td className="px-4 py-4 text-gray-800 font-medium text-lg sm:text-xl text-center whitespace-nowrap dark:text-white">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">
                      {chaiIndex === 0 ? (
                        <i className="fas fa-trophy text-yellow-500"></i>
                      ) : (
                        <i className="fas fa-mug-saucer text-blue-400"></i>
                      )}
                    </span>
                    <span>{chai.teaName}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-900 font-semibold text-lg sm:text-xl text-center dark:text-white">
                  {chai.count}
                </td>
                <td className="px-4 py-4 text-gray-900 font-semibold text-lg sm:text-xl text-center dark:text-white">
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
