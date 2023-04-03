import "./profileComp.css";
import Axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function ProfileComp() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profileCompContainer">
      <img
        className="profileImg"
        src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff`}
        alt="Profile Image"
      />
      <div className="profileDetails">
        <table className="detailTable">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{currentUser.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{currentUser.email}</td>
            </tr>
            <tr>
              <td>Mobile:</td>
              <td>{currentUser.mobile}</td>
            </tr>
            <tr>
              <td>Aadhaar:</td>
              <td>{currentUser.aadhaar}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
