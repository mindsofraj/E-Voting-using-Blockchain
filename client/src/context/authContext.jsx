import { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("voter") || null)
  );

  const navigate = useNavigate();
  const login = async (data) => {
    setCurrentUser(data);
  };
  const logout = async () => {
    await Axios.post("http://localhost:3000/logout");
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("voter", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
