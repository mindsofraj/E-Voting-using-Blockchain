import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Instructions from "./pages/instructions/Instructions";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import VotingArea from "./pages/voting-area/VotingArea";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/voting-area" element={<VotingArea />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem", textAlign: "center" }}>
              <p>OOps! There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
