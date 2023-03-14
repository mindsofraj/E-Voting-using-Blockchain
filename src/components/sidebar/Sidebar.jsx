import "./sidebar.css";
import {
  Info,
  Summarize,
  Leaderboard,
  Logout,
  HowToVote,
  People,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/instructions">
            <li className="sidebarListItem">
              <Summarize />
              <span className="sidebarListItemText">Instructions</span>
            </li>
          </Link>
          <Link to="/login">
            <li className="sidebarListItem">
              <People />
              <span className="sidebarListItemText">Candidates</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <HowToVote />
            <span className="sidebarListItemText">Voting Area</span>
          </li>

          <li className="sidebarListItem">
            <Leaderboard />
            <span className="sidebarListItemText">Result</span>
          </li>
          <hr />
          <Link to="/login">
            <li className="sidebarListItem">
              <Logout />
              <span className="sidebarListItemText">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
