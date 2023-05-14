import "./candidates.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Button from "../../components/button/Button";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../context/candidateContext";
import { motion } from "framer-motion";
import Spinner2 from "../../components/spinner2/Spinner2";

export default function Candidates({ state }) {
  const [toggleAddCandidate, setToggleAddCandidate] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [dept, setDept] = useState("");
  const [shake, setShake] = useState(false);
  const [candidateAdded, setCandidateAdded] = useState(false);
  const [msg, setMsg] = useState(null);

  // Fetching from Context
  const { getCandidate, candidatesList, setCandidatesList, loading } =
    useContext(CandidateContext);

  // Communicating with contracts
  const { contract } = state;

  // Fetching Deployer Address on mount
  useEffect(() => {
    async function getOwner() {
      // Get Owner Address
      const data = await contract.methods.owner().call();
      setOwner(data);
    }
    contract && getOwner();
  }, [state]);

  // Authenticating Admin
  const authenticateAdmin = async (e) => {
    e.preventDefault();
    if (adminAddress && owner) {
      // Validating it with user input admin address
      if (owner === adminAddress) {
        setToggleAddCandidate(true);
        setMsg(null);
      } else {
        setMsg("Invalid Admin Address");
        setShake(!shake);
        setAdminAddress("");
      }
    }
    setShake(!shake);
  };

  // Get Candidates
  useEffect(() => {
    contract && getCandidate(contract);
    return () => {
      setCandidatesList([]);
      setTimeout(() => {
        setMsg("");
      }, 6000);
    };
  }, [candidateAdded]);

  // Add Candidate
  const addCandidate = async (e) => {
    e.preventDefault();

    if (candidateName && dept) {
      await contract.methods.addCandidate(candidateName, dept).send({
        from: owner,
        gas: 5000000,
      });
      // console.log(
      //   `${candidateName.toUpperCase()} from ${dept.toUpperCase()} added as an candidate`
      // );
      setMsg(
        `✔ ${candidateName.toUpperCase()} from ${dept.toUpperCase()} added as an candidate.`
      );
      setCandidateAdded(!candidateAdded);
      setCandidateName("");
    } else {
      setShake(!shake);
      setMsg("Please fill the candidate details!");
    }
  };

  // Remove Candidate
  const removeCandidate = async () => {
    await contract.methods.removeCandidate().send({
      from: owner,
      gas: 5000000,
    });

    setCandidateAdded(!candidateAdded);
  };
  return (
    <div>
      <Topbar />
      <div className="candidatesContainer">
        <Sidebar />
        <div className="candidates">
          <div className="candidatesWrapper">
            <h1 className="title">Candidates</h1>
            {!toggleAddCandidate && (
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
                    placeholder="Enter admin address to add candidates"
                    value={adminAddress}
                    onChange={(e) => {
                      e.preventDefault();
                      setAdminAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="buttonBox" onClick={authenticateAdmin}>
                  <Button value={"Authenticate Admin"} />
                </div>
              </motion.div>
            )}
            <div className="candidateBox">
              {/* Candidate Details shown if (Owner is Verified) */}
              {toggleAddCandidate && (
                <div className="candidateDetails">
                  <h4 className="smallTitle" style={{ marginTop: "1rem" }}>
                    Add Candidates
                  </h4>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{
                      x: shake ? [10, -10, 0] : [-10, 10, 0],
                    }}
                    transition={{ type: "spring", bounce: 3 }}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        flex: 5,
                      }}
                    >
                      <input
                        value={candidateName}
                        onChange={(e) => {
                          setCandidateName(e.target.value);
                        }}
                        type="text"
                        id="inputBox"
                        placeholder="Candidate Name"
                      />
                    </div>
                    <div
                      style={{
                        flex: 5,
                      }}
                    >
                      <select
                        onChange={(e) => {
                          setDept(e.target.value);
                        }}
                        defaultValue={""}
                        className="inputSelect"
                      >
                        <option value={""} disabled hidden>
                          Select Department
                        </option>
                        <option value="cse">CSE</option>
                        <option value="ece">ECE</option>
                        <option value="eee">EEE</option>
                        <option value="mech">MECH</option>
                      </select>
                    </div>
                    <div
                      onClick={addCandidate}
                      style={{
                        flex: 2,
                      }}
                    >
                      <Button value={"Add"} />
                    </div>
                  </motion.div>
                </div>
              )}
              <div className="msg">{msg}</div>
              {/* Candidates List */}
              <div className="candidatesList">
                <h4 className="smallTitle">
                  Candidates List
                  {!loading
                    ? toggleAddCandidate && !loading
                      ? candidatesList.length !== 0 && (
                          <Tooltip
                            title={
                              <p style={{ fontSize: ".9rem" }}>
                                Remove All Candidates & Restart Voting
                              </p>
                            }
                            placement="right"
                          >
                            <IconButton
                              sx={{
                                marginBottom: "3.7px",
                                marginLeft: "5px",
                              }}
                              onClick={() => removeCandidate()}
                              aria-label="delete"
                              size="small"
                            >
                              <Delete
                                sx={{
                                  color: "#366ebb",
                                  fontSize: "24px",
                                  "&:hover": { color: "#ef2f1af8" },
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        )
                      : " "
                    : " Loading..."}
                </h4>

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
                    <table className="candidateList">
                      <thead>
                        <tr className="listHead">
                          <th>S.No.</th>
                          <th>Candidate Code</th>
                          <th>Candidate Name</th>
                          <th>Department</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {candidatesList.map((candidate, index) => (
                          <tr key={index}>
                            <td>{++index}</td>
                            <td>{candidate.id}</td>
                            <td>{candidate.name.toUpperCase()}</td>
                            <td>{candidate.dept.toUpperCase()}</td>
                            {/* <td>
                              <button
                                id="remove"
                                onClick={() => removeCandidate(candidate.id)}
                              >
                                Remove
                              </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  !loading && <h1 className="voted">No Candidates Found</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
