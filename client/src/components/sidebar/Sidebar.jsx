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
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../components/spinner/Spinner";

export default function Sidebar() {
  const { logout, loading } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

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
          <Link to="/candidates">
            <li className="sidebarListItem">
              <People />
              <span className="sidebarListItemText">Candidates</span>
            </li>
          </Link>
          <Link to="/voting-area">
            <li className="sidebarListItem">
              <HowToVote />
              <span className="sidebarListItemText">Voting Area</span>
            </li>
          </Link>
          <Link to="/results">
            <li className="sidebarListItem">
              <Leaderboard />
              <span className="sidebarListItemText">Result</span>
            </li>
          </Link>
          <hr />
          {currentUser && (
            <li
              onClick={logout}
              className="sidebarListItem"
              id={!loading ? "lastItem" : "lastItemWithCenter"}
            >
              {!loading ? (
                <>
                  <Logout />
                  <span className="sidebarListItemText">Logout</span>
                </>
              ) : (
                <Spinner />
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
