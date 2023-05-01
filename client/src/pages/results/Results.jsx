import "./results.css";
import PieChart from "../../components/piechart/piechart";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../context/candidateContext";
import Spinner2 from "../../components/spinner2/Spinner2";

export default function Results({ state }) {
  const [winners, setWinners] = useState([]);
  const [rank, setRank] = useState([]);
  const [toggle, setToggle] = useState({
    toggle: false,
    text: "Show Ranking ⬇",
  });
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

  const voteCount = candidatesList.map((data) => data.voteCount);
  useEffect(() => {
    // Winner of Election
    const getWinner = () => {
      const maxVoteNum = Math.max(...voteCount);
      candidatesList.forEach((candidate) => {
        if (maxVoteNum > 0) {
          candidate.voteCount === maxVoteNum.toString() &&
            setWinners((prev) => [...prev, " " + candidate.name.toUpperCase()]);
        } else {
          console.log("No Winners");
        }
      });
    };

    getWinner();
  }, []);
  useEffect(() => {
    const getRank = () => {
      setRank(candidatesList.slice().sort((a, b) => b.voteCount - a.voteCount));
    };
    getRank();
  }, []);

  // Add Ordinals to Rank
  function getNumberWithOrdinal(n) {
    let s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  // Chart Js Configuration
  const [chartData, setChartData] = useState({
    labels: candidatesList.map((data) => data.name),
    datasets: [
      {
        label: " Vote-Count",
        data: voteCount,
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
                  <div className="rightSection">
                    <p className="resultText">
                      {winners.length > 1
                        ? winners + " have got EQUAL votes. It's a TIE."
                        : `${winners[0]} gets majority of VOTES and WIN's this ELECTION.`}
                    </p>
                    <button
                      onClick={() =>
                        setToggle({
                          toggle: !toggle.toggle,
                          text: toggle.toggle
                            ? "Show Ranking ⬇"
                            : "Show Piechart ⬇",
                        })
                      }
                      className="toggle"
                    >
                      {toggle.text}
                    </button>
                    {!toggle.toggle ? (
                      <PieChart className="chart" chartData={chartData} />
                    ) : (
                      <table className="rankTable">
                        <thead>
                          <tr className="rankHead">
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Dept</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rank.map((cand, index) => (
                            <tr key={index}>
                              <td>{getNumberWithOrdinal(++index)}</td>
                              <td>{cand.name.toUpperCase()}</td>
                              <td>{cand.dept.toUpperCase()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
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
