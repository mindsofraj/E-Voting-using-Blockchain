import React from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import Profile from "../../components/profile/Profile";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Profile />
        {/* <Feed /> */}
      </div>
    </div>
  );
}
