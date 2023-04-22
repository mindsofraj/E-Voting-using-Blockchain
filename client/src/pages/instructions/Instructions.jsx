import "./instruction.css";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";

const Information = () => {
  return (
    <div className="instruction">
      <div className="instructionWrapper">
        <h1 className="title">Instructions</h1>
        <h3 className="subtitle">Hey Voter,</h3>
        <div className="text">
          To vote for your favourite Candidate,
          <ul className="list">
            <li>
              First you have to create an account on N-Vaaku by providing your
              correct details as on <b>Aadhaar Card</b>.
            </li>

            <li>Next you will be redirected to the dashboard.</li>
            <li>
              In Dashboard, Go to the <b>Voting Area</b>.
            </li>
            <li>
              There you can see all the candidates lists, vote for your
              favourite candidate by clicking on <b>VOTE</b> button.
            </li>
            <li>
              And that's it, easy-peasy! <b>Happy Voting!</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Instructions() {
  return (
    <div>
      <Topbar />
      <div className="instructionContainer">
        <Sidebar />
        <Information />
      </div>
    </div>
  );
}
