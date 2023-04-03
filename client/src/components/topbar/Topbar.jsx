import "./topbar.css";
import { Link } from "react-router-dom";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Logout,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Topbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">
            <span className="smallN">N</span>Vaaku
          </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for Candidates..."
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
            <span className="topbarLink link">Home</span>
          </Link>
          <Link to="/about">
            <span className="topbarLink link">About Us</span>
          </Link>
        </div>
        <Link to="/profile">
          {currentUser && (
            <div className="userBox">
              <Tooltip title="Profile" arrow>
                <img
                  src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff`}
                  alt="Profile"
                  className="topbarImg"
                />
              </Tooltip>
              <div className="profileName link">{currentUser.name}</div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
