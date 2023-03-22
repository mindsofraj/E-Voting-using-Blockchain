import "./register.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [registerStatus, setRegisterStatus] = useState(
    "Fill your details as on Aadhaar Card"
  );

  const registerVoter = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/register", {
      name: name,
      email: email,
      password: password,
      aadhaar: aadhaar,
      mobile: mobile,
    }).then((res) => {
      setRegisterStatus(res.data.message);
    });
  };

  const aadhaarInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAadhaar(e.target.value);
    }
  };
  const mobileInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">N-Vaaku</h3>
          <span className="registerDesc">
            With Great Power Comes, Great Responsibility
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={registerVoter}>
            <span className="registerStatus">{registerStatus}</span>

            <input
              type="text"
              placeholder="Name"
              minLength={2}
              onChange={(e) => setName(e.target.value)}
              className="registerInput"
              required
            />
            <input
              type="text"
              placeholder="Aadhaar No."
              onChange={aadhaarInput}
              className="registerInput"
              minLength={12}
              maxLength={12}
              value={aadhaar}
              onInvalid={(e) => {
                e.target.setCustomValidity("Enter valid Aadhaar Number");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="registerInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="registerInput"
              required
            />
            <input
              type="text"
              placeholder="Mobile No."
              className="registerInput"
              onChange={mobileInput}
              minLength={10}
              maxLength={10}
              value={mobile}
              onInvalid={(e) => {
                e.target.setCustomValidity("Enter valid Mobile Number");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              required
            />
            <button type="submit" className="registerButton">
              Signup
            </button>
            <Link to="/login">
              <button type="submit" className="alreadyRegisterButton loginLink">
                Already have an Account? Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
