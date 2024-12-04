import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import { Component, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const PrivateRouter = ({ component }) => {
    if (token) {
      setIsAuthenticated(true);
      console.log(isAuthenticated);
    }

    return isAuthenticated ? component : <Navigate to="/login" />;
  };

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<PrivateRouter component={<Home />} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
