import { chaiConsumptionHistory, getTopThreeTeas } from "../utils";

const Table = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100 justify-center">
        <span className="text-2xl">📋</span>
        <h3 className="text-2xl font-bold text-gray-800 ">
          Top 3 Most Consumed Teas
        </h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-center">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3 font-extrabold text-xl">Chai Name</th>
              <th className="px-6 py-3 font-extrabold text-xl">
                Number of Purchase
              </th>
              <th className="px-6 py-3 font-extrabold text-xl">
                Percentage of Total
              </th>
            </tr>
          </thead>
          <tbody className="">
            {getTopThreeTeas(chaiConsumptionHistory).map((chai, chaiIndex) => (
              <tr
                key={chaiIndex}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-gray-700 flex justify-center items-center gap-3 ">
                  <span className="text-lg">🍵</span>
                  <span className="font-bold text-lg">{chai.teaName}</span>
                </td>
                <td className="px-6 py-4 text-gray-700 hover:font-medium hover:text-orange-600 text-xl font-bold ">
                  {chai.count}
                </td>
                <td className="px-6 py-4 text-gray-700 hover:font-medium hover:text-orange-600 text-xl font-bold ">
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
