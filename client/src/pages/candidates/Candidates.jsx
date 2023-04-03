import "./candidates.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";

export default function Candidates() {
  return (
    <div>
      <Topbar />
      <div className="candidatesContainer">
        <Sidebar />
        <div className="candidates">
          <div className="candidatesWrapper">
            <h1 className="title">Candidates</h1>
            <p className="para">This Candidates area.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
