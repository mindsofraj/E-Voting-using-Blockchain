import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { CandidateContextProvider } from "./context/candidateContext";

import App from "./App";
import { CandidateContext } from "./context/candidateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <CandidateContextProvider>
        <App />
      </CandidateContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
