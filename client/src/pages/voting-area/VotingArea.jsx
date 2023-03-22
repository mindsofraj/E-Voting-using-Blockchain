import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./votingArea.css";

export default function VotingArea() {
  return (
    <div>
      <Topbar />
      <div className="votingContainer">
        <Sidebar />
        <div className="voting">
          <div className="votingWrapper">
            <h1 className="title">Voting Area</h1>
            <p className="para">This voting area.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
