import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(
    "Enter you Email and Password"
  );

  const loginVoter = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    }).then((res) => setLoginStatus(res.data.message));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">N-Vaaku</h3>
          <span className="loginDesc">
            With Great Power Comes, Great Responsibility
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={loginVoter}>
            <span className="loginStatus">{loginStatus}</span>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="loginButton">
              Login
            </button>
            <Link to="/register">
              <button className="loginRegisterButton link">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
