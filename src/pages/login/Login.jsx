import "./login.css";

export default function Login() {
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
          <div className="loginBox">
            <input type="email" placeholder="Email" className="loginInput" />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton">Login</button>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
