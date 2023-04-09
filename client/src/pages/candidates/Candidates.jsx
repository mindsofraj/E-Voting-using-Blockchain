import "./candidates.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function Candidates() {
  return (
    <div>
      <Topbar />
      <div className="candidatesContainer">
        <Sidebar />
        <div className="candidates">
          <div className="candidatesWrapper">
            <h1 className="title">Candidates</h1>

            <div className="adminDetails">
              <div className="inputBox">
                <Input placeholder={"Enter Admin Address"} />
              </div>
              <div className="buttonBox">
                <Button value={"Authenticate Admin"} />
              </div>
            </div>
            <div className="candidateBox">
              {/* Candidate Details */}
              <div className="candidateDetails">
                <h4 className="smallTitle">Add Candidates</h4>
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
                    <Input placeholder={"Candidate Name"} />
                  </div>
                  <div
                    style={{
                      flex: 5,
                    }}
                  >
                    <select className="inputSelect">
                      <option selected disabled>
                        Select Department
                      </option>
                      <option value="cse">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="eee">EEE</option>
                      <option value="mech">MECH</option>
                    </select>
                  </div>
                  <div
                    style={{
                      flex: 2,
                    }}
                  >
                    <Button value={"Add"} />
                  </div>
                </div>
              </div>
              {/* Candidates List */}
              <div className="candidatesList">
                <h4 className="smallTitle">Candidates List</h4>
                <table className="candidateList">
                  <tr className="listHead">
                    <th>Candidate Code</th>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Satish Raj</td>
                    <td>CSE</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Thirumavalavan</td>
                    <td>CSE</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Satish Raj</td>
                    <td>CSE</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Satish Raj</td>
                    <td>CSE</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
