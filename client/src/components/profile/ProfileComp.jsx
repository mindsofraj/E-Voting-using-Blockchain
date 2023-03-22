import "./profileComp.css";
import Axios from "axios";
import { useState } from "react";

export default function ProfileComp() {
  const [voterDetails, setVoterDetails] = useState([]);
  Axios.get("http://localhost:3000/profile").then((res) => {
    setVoterDetails(res.data[1]);
  });

  return (
    <div className="profileCompContainer">
      <img
        className="profileImg"
        src="https://superawesomevectors.com/wp-content/uploads/2017/03/family-guy-peter-griffin-vector-thumb-275x195.jpg"
        alt="Profile Image"
      />
      <div className="profileDetails">
        <table className="detailTable">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{voterDetails.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{voterDetails.email}</td>
            </tr>
            <tr>
              <td>Mobile:</td>
              <td>{voterDetails.mobile}</td>
            </tr>
            {/* <tr>
              <td>Aadhaar No:</td>
              <td>4816 3433 6673</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
