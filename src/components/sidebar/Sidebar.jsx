import "./sidebar.css";
import {
  Info,
  Summarize,
  Leaderboard,
  Logout,
  HowToVote,
  People,
} from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Summarize />
            <span className="sidebarListItemText">Instructions</span>
          </li>
          <li className="sidebarListItem">
            <People />
            <span className="sidebarListItemText">Candidates</span>
          </li>
          <li className="sidebarListItem">
            <HowToVote />
            <span className="sidebarListItemText">Voting Area</span>
          </li>
          <li className="sidebarListItem">
            <Leaderboard />
            <span className="sidebarListItemText">Result</span>
          </li>
          <hr />
          <li className="sidebarListItem">
            <Logout />
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
