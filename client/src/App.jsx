import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Candidates from "./pages/candidates/Candidates";
import Home from "./pages/home/Home";
import Instructions from "./pages/instructions/Instructions";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Results from "./pages/results/Results";
import VotingArea from "./pages/voting-area/VotingArea";
import PrivateRoute from "./privateRoute/privateRoute";
// Web3
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Voting from "../src/contracts/Voting.json";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  // Initialize Web3 and Connect to Smart Contract
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    const loadProvider = async () => {
      if (provider) {
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Voting.networks[networkId];
        // Create Contract Instance
        const contract = new web3.eth.Contract(
          Voting.abi,
          deployedNetwork.address
        );
        setState({
          web3: web3,
          contract: contract,
        });
      } else {
        console.error("Please Install Metamask", err);
      }
    };

    provider && loadProvider();
  }, [state]);

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
              <VotingArea state={state} />
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
              <Results state={state} />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <PrivateRoute>
              <Candidates state={state} />
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
