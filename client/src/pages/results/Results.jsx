import "./results.css";
import PieChart from "../../components/piechart/piechart";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../context/candidateContext";
import { AuthContext } from "../../context/authContext";
import Spinner2 from "../../components/spinner2/Spinner2";

export default function Results({ state }) {
  const { currentUser } = useContext(AuthContext);
  const { getCandidate, candidatesList, setCandidatesList, loading } =
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
              {/* Showing Spinner While Loading */}
              <div
                style={{
                  display: loading ? "block" : "none",
                  textAlign: "center",
                  marginTop: "6%",
                }}
              >
                {loading && <Spinner2 />}
              </div>
              {!loading && candidatesList.length !== 0 ? (
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
              ) : (
                !loading && (
                  <h1 className="voted">Voting haven't yet started!</h1>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
