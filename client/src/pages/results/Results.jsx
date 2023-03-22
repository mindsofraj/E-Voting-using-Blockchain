import "./results.css";
import { useState } from "react";
import { userData } from "../../dummyData";
import PieChart from "../../components/piechart/piechart";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";

export default function Results() {
  const [chartData, setChartData] = useState({
    labels: userData.map((data) => data.candidateName),
    datasets: [
      {
        label: " Vote-Count",
        data: userData.map((data) => data.voteCount),
      },
    ],
  });

  return (
    <div>
      <Topbar />
      <div className="resultsContainer">
        <Sidebar />
        <div className="results">
          <div className="resultsWrapper">
            <h1 className="title">About N-Vaaku</h1>
            <div className="resultsSection">
              <div className="chart">
                <PieChart chartData={chartData} />
              </div>
              <div className="table">
                <table>
                  <thead>
                    <th>Party</th>
                    <th>Vote Count</th>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <tr>
                        <td>{user.candidateName}</td>
                        <td>{user.voteCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
