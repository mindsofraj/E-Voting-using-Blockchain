import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Candidates from "./pages/candidates/candidates";
import Home from "./pages/home/Home";
import Instructions from "./pages/instructions/Instructions";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Results from "./pages/results/results";
import VotingArea from "./pages/voting-area/VotingArea";
import PrivateRoute from "./privateRoute/privateRoute";
import Web3 from "web3";
import { ABI, contract_addr } from "./contractDetails";

function App() {
  useEffect(() => {
    // connect();
  }, []);

  async function connect() {
    try {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(ABI, contract_addr);
      // await contract.methods
      //   .addCandidate("Satish")
      //   .send({ from: "0x86754ef724Df1e27A2bA2F94C20cEf363405A556" });

      // const getCandidate = await contract.methods.getCandidate(1).call();
      // console.log(getCandidate);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructions"
          element={
            <PrivateRoute>
              <Instructions />
            </PrivateRoute>
          }
        />
        <Route
          path="/voting-area"
          element={
            <PrivateRoute>
              <VotingArea />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <PrivateRoute>
              <Candidates />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <main
              style={{ padding: "5rem", fontSize: "2rem", textAlign: "center" }}
            >
              <p>OOps! There's nothing here!</p>
              <br />
              <Link to="/">Go to Home</Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
