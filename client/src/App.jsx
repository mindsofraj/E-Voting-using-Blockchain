import React from "react";
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

function App() {
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
