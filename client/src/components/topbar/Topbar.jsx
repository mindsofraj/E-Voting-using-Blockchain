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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { CandidateContext } from "../../context/candidateContext";
import CountUp from "react-countup";

export default function Topbar() {
  const [candidatesCount, setCandidatesCount] = useState(0);
  const [votersCount, setVotersCount] = useState(0);
  // Context
  const { currentUser } = useContext(AuthContext);
  const { numOfCandidates, numOfVoters, contract } =
    useContext(CandidateContext);

  useEffect(() => {
    const getCount = async () => {
      const voters = await numOfVoters(contract);
      const cand = await numOfCandidates(contract);
      setVotersCount(voters);
      setCandidatesCount(cand);
    };
    contract && getCount();
  }, [contract]);

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
        {/* <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for Candidates..."
            className="searchInput"
          />
        </div> */}
        <div className="welcomMsg">
          <p>Welcome to N-Vaaku, {currentUser.name}</p>
        </div>
        <div className="counting">
          <CountUp
            className="largeNumber"
            end={candidatesCount}
            duration={2}
            useEasing={true}
          />
          <p>CANDIDATES</p>
          <CountUp
            className="largeNumber"
            end={votersCount}
            duration={2}
            useEasing={true}
          />
          <p>VOTERS</p>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
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
