import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
