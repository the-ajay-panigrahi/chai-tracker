import { useContext } from "react";
import { getTopThreeTeas } from "../utils/index.js";
import { AuthContext } from "../utils/AuthContext.jsx";
const Table = () => {
  const { globalData } = useContext(AuthContext);
  return (
    <div className="top-teas">
      <table>
        <caption>Top 3 most consumed teas</caption>
        <thead>
          <tr>
            <th scope="col">Chai name</th>
            <th scope="col">Purchase count</th>
            <th scope="col">Total %</th>
          </tr>
        </thead>
        <tbody>
          {getTopThreeTeas(globalData).map((chai, index) => (
            <tr key={chai.teaName}>
              <td>
                <span className="tea-rank">0{index + 1}</span>
                {chai.teaName}
              </td>
              <td>{chai.count}</td>
              <td>{chai.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
