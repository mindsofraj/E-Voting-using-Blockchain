import "./votingArea.css";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import Button from "../../components/button/Button";

export default function VotingArea() {
  return (
    <div>
      <Topbar />
      <div className="votingContainer">
        <Sidebar />
        <div className="voting">
          <div className="votingWrapper">
            <h1 className="title">Voting Area</h1>
            {/* Candidate Cards */}
            <div className="cardGrid">
              <div className="candidateCard">
                <div className="cardImg">
                  <img
                    src={`https://ui-avatars.com/api/?name=Satish%20Raj&background=0D8ABC&color=fff`}
                    alt="Candidate Image"
                  />
                  <p className="candidateId">1</p>
                </div>
                <div className="cardDetails">
                  <p>Satish Raj</p>
                  <p>CSE</p>
                </div>
                <div className="cardButton">
                  <Button value={"VOTE"} />
                </div>
              </div>
              <div className="candidateCard">
                <div className="cardImg">
                  <img
                    src={`https://ui-avatars.com/api/?name=Satish%20Raj&background=0D8ABC&color=fff`}
                    alt="Candidate Image"
                  />
                  <p className="candidateId">1</p>
                </div>
                <div className="cardDetails">
                  <p>Satish Raj</p>
                  <p>CSE</p>
                </div>
                <div className="cardButton">
                  <Button value={"VOTE"} />
                </div>
              </div>
              <div className="candidateCard">
                <div className="cardImg">
                  <img
                    src={`https://ui-avatars.com/api/?name=Satish%20Raj&background=0D8ABC&color=fff`}
                    alt="Candidate Image"
                  />
                  <p className="candidateId">1</p>
                </div>
                <div className="cardDetails">
                  <p>Satish Raj</p>
                  <p>CSE</p>
                </div>
                <div className="cardButton">
                  <Button value={"VOTE"} />
                </div>
              </div>
              <div className="candidateCard">
                <div className="cardImg">
                  <img
                    src={`https://ui-avatars.com/api/?name=Satish%20Raj&background=0D8ABC&color=fff`}
                    alt="Candidate Image"
                  />
                  <p className="candidateId">1</p>
                </div>
                <div className="cardDetails">
                  <p>Satish Raj</p>
                  <p>CSE</p>
                </div>
                <div className="cardButton">
                  <Button value={"VOTE"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
