import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../components/spinner/Spinner";

export default function Login() {
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(
    "Enter you Email and Password"
  );

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const loginVoter = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.post("http://localhost:3000/login", inputs).then((res) => {
      if (res.data.status === 401) {
        setLoginStatus(res.data.message);
        setLoading(false);
      } else {
        login(res.data);
        setLoading(false);
        navigate("/");
      }
    });
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
              name="email"
              placeholder="Email"
              className="loginInput"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="loginInput"
              onChange={handleChange}
              required
            />
            <button type="submit" className="loginButton">
              {!loading ? "Login" : <Spinner />}
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
