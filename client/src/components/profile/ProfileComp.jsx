import "./profileComp.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";

export default function ProfileComp() {
  const { currentUser } = useContext(AuthContext);
  const [copy, setCopy] = useState("Copy Adress");

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
            <tr>
              <td>Account:</td>
              <td>
                {currentUser.address.substring(0, 6) +
                  "...." +
                  currentUser.address.slice(-6)}

                <Tooltip
                  title={<p style={{ fontSize: ".9rem" }}>{copy}</p>}
                  placement="right"
                >
                  <IconButton
                    sx={{ marginBottom: "3.7px" }}
                    onClick={() => {
                      setCopy("Copied Successfully");
                      setTimeout(() => {
                        setCopy("Copy Address");
                      }, 2000);
                      navigator.clipboard.writeText(currentUser.address);
                    }}
                  >
                    <ContentCopyIcon
                      sx={{
                        fontSize: "18px",
                        "&:hover": { color: "#366ebb" },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
