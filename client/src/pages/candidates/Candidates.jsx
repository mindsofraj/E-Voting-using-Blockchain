import "./candidates.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";

export default function Candidates({ state }) {
  const [toggleAddCandidate, setToggleAddCandidate] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [dept, setDept] = useState("");
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidateAdded, setCandidateAdded] = useState(false);
  const [msg, setMsg] = useState(null);

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
      }
    }
  };

  useEffect(() => {
    contract && getCandidate();
    return () => {
      setCandidatesList([]);

      setTimeout(() => {
        setMsg("");
      }, 6000);
    };
  }, [candidateAdded]);

  // Get Candidate
  const getCandidate = async () => {
    const candidateNum = await contract.methods.getNumOfCandidates().call();
    // console.log("candidateNum", candidateNum);
    for (let i = 0; i <= candidateNum; i++) {
      const candidate = await contract.methods.getCandidate(i).call();
      if (candidate[0] && candidate[1] && candidate[2]) {
        // console.log(candidate[0], candidate[1], candidate[2]);
        let candDetail = {
          id: candidate[0],
          name: candidate[1],
          dept: candidate[2],
        };
        setCandidatesList((prev) => [...prev, candDetail]);
      }
    }
  };

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
      setMsg("Please fill the candidate details!");
    }
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
              <div className="adminDetails">
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
              </div>
            )}
            <div className="candidateBox">
              {/* Candidate Details shown if (Owner is Verified) */}
              {toggleAddCandidate && (
                <div className="candidateDetails">
                  <h4 className="smallTitle" style={{ marginTop: "1rem" }}>
                    Add Candidates
                  </h4>
                  <div
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
                  </div>
                </div>
              )}
              <div className="msg">{msg}</div>
              {/* Candidates List */}
              <div className="candidatesList">
                {candidatesList.length !== 0 && (
                  <>
                    <h4 className="smallTitle">Candidates List</h4>
                    <table className="candidateList">
                      <thead>
                        <tr className="listHead">
                          <th>Candidate Code</th>
                          <th>Candidate Name</th>
                          <th>Department</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidatesList.map((candidate) => (
                          <tr key={candidate.id}>
                            <td>{candidate.id}</td>
                            <td>{candidate.name.toUpperCase()}</td>
                            <td>{candidate.dept.toUpperCase()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
