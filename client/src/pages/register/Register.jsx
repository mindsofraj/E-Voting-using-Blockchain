import "./register.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import emailjs from "@emailjs/browser";

export default function Register({ state }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);

  const [registerStatus, setRegisterStatus] = useState(
    "Fill your details as on Aadhaar Card"
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const form = useRef();

  // Get Accounts
  useEffect(() => {
    const { web3 } = state;
    const getAccounts = async () => {
      try {
        const acc = await web3.eth.getAccounts();
        acc.shift();
        setAddressList(acc);
      } catch (err) {
        console.log("Cannot Fetch Accounts from Blockchain");
      }
    };
    web3 && getAccounts();
  }, []);

  useEffect(() => {
    setAddress(addressList[(Math.random() * addressList.length) | 0]);
  }, [addressList]);

  // Register Voter
  const registerVoter = (e) => {
    e.preventDefault();
    setLoading(true);

    // Inserting data to database
    Axios.post("http://localhost:3000/register", {
      name: name,
      email: email,
      password: password,
      aadhaar: aadhaar,
      mobile: mobile,
      address: address,
    }).then((res) => {
      if (res.data.status === 409) {
        setRegisterStatus(res.data.message);
        setLoading(false);
      } else {
        setLoading(true);
        // Sending Ethereum Address to Email
        emailjs
          .sendForm(
            "service_0m92y6b",
            "template_fd1uq23",
            form.current,
            "wQdiod7NvEouqTtGz"
          )
          .then(
            (result) => {
              console.log("Check your email for Ethereum Account Address");
              setLoading(false);
              navigate("/login");
            },
            (error) => {
              setRegisterStatus(error.text);
            }
          );
        navigate("/login");
        setLoading(false);
      }
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
          <form ref={form} className="registerBox" onSubmit={registerVoter}>
            <span className="registerStatus">{registerStatus}</span>

            <input
              type="text"
              name="user_name"
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
              name="to_email"
              onChange={(e) => setEmail(e.target.value)}
              className="registerInput"
              required
            />
            <input type="hidden" name="address" value={address || " "} />
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
              {!loading ? "Signup" : <Spinner />}
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
