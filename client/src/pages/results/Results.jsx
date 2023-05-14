// Admin Address
// 0xc25578881E7caCdCa974Ce354e04bd9fADB4764b

import "./results.css";
import PieChart from "../../components/piechart/piechart";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CandidateContext } from "../../context/candidateContext";
import Spinner2 from "../../components/spinner2/Spinner2";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Results({ state }) {
  const [winners, setWinners] = useState([]);
  const [toggleResults, setToggleResults] = useState(false);
  const [publish, setPublish] = useState(false);
  const [shake, setShake] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [rank, setRank] = useState([]);
  const [chartData, setChartData] = useState({
    labels: null,
    datasets: [],
  });
  const { getCandidate, candidatesList, setCandidatesList, loading } =
    useContext(CandidateContext);

  const { contract } = state;

  const navigate = useNavigate();

  const voteCount = candidatesList.map((data) => data.voteCount);

  // Fetching Owner Address on mount
  useEffect(() => {
    async function getOwner() {
      // Get Owner Address
      const data = await contract.methods.owner().call();
      setOwner(data);
    }
    contract && getOwner();
  }, [state]);

  // Check If Results Published
  useEffect(() => {
    async function checkPublish() {
      const data = await contract.methods.publishResults().call();
      setPublish(data);
    }
    contract && checkPublish();
  }, [toggleResults]);

  // Authenticating Admin
  const authenticateAdmin = async () => {
    if (adminAddress && owner) {
      // Validating it with user input admin address
      if (owner === adminAddress) {
        setToggleResults(true);
        return true;
      } else {
        setToggleResults(false);
        setShake(!shake);
        setAdminAddress("");
        return false;
      }
    }
    setShake(!shake);
    return false;
  };

  // Get Canididates and Chart
  useEffect(() => {
    contract && getCandidate(contract);
    setChartData({
      labels: candidatesList.map((data) => data.name),
      datasets: [
        {
          label: " Vote-Count",
          data: voteCount,
        },
      ],
    });
    return () => {
      setCandidatesList([]);
    };
  }, [toggleResults]);

  // Get Winner of Election
  useEffect(() => {
    const getWinner = () => {
      const maxVoteNum = Math.max(...voteCount);
      candidatesList.forEach((candidate) => {
        if (maxVoteNum > 0) {
          candidate.voteCount === maxVoteNum.toString() &&
            setWinners((prev) => [...prev, " " + candidate.name.toUpperCase()]);
        }
      });
    };

    getWinner();
  }, [owner]);

  // Get Rankings
  useEffect(() => {
    const getRank = () => {
      setRank(candidatesList.slice().sort((a, b) => b.voteCount - a.voteCount));
    };
    getRank();
  }, [owner, candidatesList]);

  // Publish Results
  const publishResults = async () => {
    const authenticated = await authenticateAdmin();
    if (authenticated) {
      await contract.methods.publish(true).send({ from: owner });
      navigate("/candidates");
      toast("📢 Published Results Successfully!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Add Ordinals to Rank
  function getNumberWithOrdinal(n) {
    let s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div>
      <Topbar />
      <div className="resultsContainer">
        <Sidebar />
        <div className="results">
          <div className="resultsWrapper">
            <h1 className="title">Results</h1>
            {candidatesList.length !== 0 && !publish && !toggleResults && (
              <motion.div
                initial={{ x: 0 }}
                animate={{
                  x: shake ? [10, -10, 0] : [-10, 10, 0],
                }}
                transition={{ type: "spring", bounce: 3 }}
                className="adminDetails"
              >
                <div className="inputBox">
                  <input
                    type="text"
                    id="inputBox"
                    placeholder="Enter admin address to publish results"
                    value={adminAddress}
                    onChange={(e) => {
                      e.preventDefault();
                      setAdminAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="buttonBox" onClick={publishResults}>
                  <Button value={"Publish Results"} />
                </div>
              </motion.div>
            )}
            {candidatesList.length !== 0 && publish ? (
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
                {!loading && (
                  <>
                    <div className="rightSection">
                      <div className="resultText">
                        {winners.length > 1 ? (
                          winners + " have got EQUAL votes. It's a TIE."
                        ) : (
                          <>
                            <motion.h1
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                            >
                              {winners[0]
                                ? winners[0]
                                : navigate("/candidates")}
                            </motion.h1>
                            <p>
                              gets majority of VOTES and WIN's this ELECTION.
                            </p>
                          </>
                        )}
                      </div>

                      <PieChart className="chart" chartData={chartData} />
                    </div>
                    <table className="resultTable">
                      <thead>
                        <tr className="listHead">
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Dept</th>
                          <th>ID</th>
                          <th>Vote Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rank.map((candidate, index) => (
                          <tr key={index}>
                            <td id="rank">{getNumberWithOrdinal(++index)}</td>
                            <td>{candidate.name.toUpperCase()}</td>
                            <td>{candidate.dept.toUpperCase()}</td>
                            <td>{candidate.id}</td>
                            <td>{candidate.voteCount.toUpperCase()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            ) : (
              <h1 className="voted">Leaders are made, they are not born.!</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
