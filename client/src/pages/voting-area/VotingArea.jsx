import "./votingArea.css";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import Button from "../../components/button/Button";
import { CandidateContext } from "../../context/candidateContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";
import Spinner2 from "../../components/spinner2/Spinner2";
import { useNavigate } from "react-router-dom";

export default function VotingArea({ state }) {
  const navigate = useNavigate();
  const [voterAddress, setVoterAddress] = useState("");
  const [toggle, setToggle] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [shake, setShake] = useState(false);
  const [voted, setVoted] = useState(false);

  const { getCandidate, candidatesList, setCandidatesList, loading } =
    useContext(CandidateContext);
  const { currentUser } = useContext(AuthContext);

  const { contract, web3 } = state;

  // Get Accounts
  useEffect(() => {
    const getAccounts = async () => {
      const acc = await web3.eth.getAccounts();
      setAccounts(acc);
    };
    getAccounts();
  }, []);

  // Check if Voter has voted or not
  useEffect(() => {
    const checkIfVoted = async () => {
      const voted = await contract.methods
        .checkIfVoted(currentUser.aadhaar)
        .call();
      setVoted(voted);
    };
    contract && checkIfVoted();
  }, [contract]);

  // Get Canididates
  useEffect(() => {
    contract && getCandidate(contract);
    return () => {
      setCandidatesList([]);
    };
  }, []);

  // Verify Voter
  const verifyVoter = () => {
    accounts.forEach((acc) => {
      if (voterAddress === acc) {
        setToggle(true);
      } else {
        setShake(!shake);
      }
    });
  };
  // Do Vote
  const doVote = async (id, name, dept) => {
    await contract.methods.doVote(id, currentUser.aadhaar).send({
      from: voterAddress,
      gas: 5000000,
    });
    setVoted(true);
    navigate("/");
  };

  return (
    <div>
      <Topbar />
      <div className="votingContainer">
        <Sidebar />
        <div className="voting">
          <div className="votingWrapper">
            <h1 className="title">Voting Area</h1>
            {!voted ? (
              <>
                {!toggle && (
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{
                      x: shake ? [10, -10, 0] : [-10, 10, 0],
                    }}
                    transition={{ type: "spring", bounce: 3 }}
                    className="voterAddress"
                  >
                    <div className="inputBox">
                      <input
                        type="text"
                        id="inputBox"
                        placeholder="Enter your Ethereum Account address to vote"
                        value={voterAddress}
                        onChange={(e) => {
                          e.preventDefault();
                          setVoterAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="buttonBox" onClick={verifyVoter}>
                      <Button value={"Verify"} />
                    </div>
                  </motion.div>
                )}
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
                {/* Candidate Cards */}
                <div className="cardGrid">
                  {!loading && candidatesList.length !== 0
                    ? candidatesList.map((candidate, index) => (
                        <motion.div
                          whileHover={{
                            scale: 1.09,
                            transition: { duration: 0.19 },
                          }}
                          className="candidateCard"
                          key={index}
                        >
                          <div className="cardImg">
                            <img
                              src={`https://ui-avatars.com/api/?name=${candidate.name}&background=0D8ABC&color=fff`}
                              alt="Candidate Image"
                            />
                            <p className="candidateId">{candidate.id}</p>
                          </div>
                          <div className="cardDetails">
                            <p>{candidate.name}</p>
                            <p>{candidate.dept}</p>
                          </div>
                          {toggle && (
                            <div
                              className="cardButton"
                              onClick={() =>
                                doVote(
                                  candidate.id,
                                  candidate.name,
                                  candidate.dept
                                )
                              }
                            >
                              <Button value={"VOTE"} />
                            </div>
                          )}
                        </motion.div>
                      ))
                    : !loading && (
                        <h1 className="voted">No Candidates Found</h1>
                      )}
                </div>
              </>
            ) : !loading ? (
              <div className="voted">
                <p>You have already Voted!</p>
                <h1>THANKS FOR VOTING!</h1>
              </div>
            ) : (
              <div
                style={{
                  display: loading ? "block" : "none",
                  textAlign: "center",
                  marginTop: "6%",
                }}
              >
                <Spinner2 />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
