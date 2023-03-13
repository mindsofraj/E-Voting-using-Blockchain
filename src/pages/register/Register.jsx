import "./register.css";

export default function Register() {
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
          <div className="registerBox">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
            />
            <input type="email" placeholder="Email" className="registerInput" />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="registerInput"
            />
            <button className="registerButton">Signup</button>
            <button className="alreadyRegisterButton">
              Already have an Account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
