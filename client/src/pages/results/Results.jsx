import "./results.css";
import PieChart from "../../components/piechart/piechart";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../context/candidateContext";
import { AuthContext } from "../../context/authContext";

export default function Results({ state }) {
  const { currentUser } = useContext(AuthContext);
  const { getCandidate, candidatesList, setCandidatesList } =
    useContext(CandidateContext);
  const { contract } = state;

  // Get Canididates
  useEffect(() => {
    contract && getCandidate(contract);
    return () => {
      setCandidatesList([]);
    };
  }, []);

  const [chartData, setChartData] = useState({
    labels: candidatesList.map((data) => data.name),
    datasets: [
      {
        label: " Vote-Count",
        data: candidatesList.map((data) => data.voteCount),
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
            <h1 className="title">Results</h1>
            <div className="resultsSection">
              {candidatesList.length !== 0 && (
                <>
                  <table className="resultTable">
                    <thead>
                      <tr className="listHead">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Dept</th>
                        <th>Vote Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidatesList.map((candidate, index) => (
                        <tr key={index}>
                          <td>{candidate.id}</td>
                          <td>{candidate.name.toUpperCase()}</td>
                          <td>{candidate.dept.toUpperCase()}</td>
                          <td>{candidate.voteCount.toUpperCase()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="chart">
                    <PieChart chartData={chartData} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
