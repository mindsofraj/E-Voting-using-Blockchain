import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./about.css";

export default function About() {
  return (
    <div>
      <Topbar />
      <div className="aboutContainer">
        <Sidebar />
        <div className="about">
          <div className="aboutWrapper">
            <h1 className="title">About N-Vaaku</h1>
            <p className="para">
              <b>N-Vaaku</b> is an secure online platform through which voters
              can cast there vote to desired candidates from anywhere and
              anytime. <br />
              <br />
              N-Vaaku is more secure than Electronic Voting Machines, as it uses{" "}
              <b>Ethereum Blockchain Technology</b> to maintain the transperancy
              to the voters and avoid fraudulent activities in voting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
