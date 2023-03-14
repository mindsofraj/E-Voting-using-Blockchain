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

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">N-Vaaku</span>
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
        <Tooltip title="Profile" arrow>
          <Link to="/profile">
            <img
              src="https://www.behindwoods.com/tamil-movies/slideshow/the-ultimate-dream-girl/images/nazariya-nazim---eyes.jpg"
              alt="Profile"
              className="topbarImg"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
