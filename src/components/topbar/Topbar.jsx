import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Logout,
} from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">N-Vaaku</span>
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
          <span className="topbarLink">Home</span>
          <span className="topbarLink">About</span>
        </div>

        <img
          src="https://www.behindwoods.com/tamil-movies/slideshow/the-ultimate-dream-girl/images/nazariya-nazim---eyes.jpg"
          alt="Profile"
          className="topbarImg"
        />
      </div>
    </div>
  );
}
