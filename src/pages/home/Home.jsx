import React from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <Feed />
      </div>
    </div>
  );
}
