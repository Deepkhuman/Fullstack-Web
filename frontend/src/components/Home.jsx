import { Box, Card } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../Axios/axiosClient";
import { handleError } from "../../utils";

const Home = () => {
  const [loggedinuser, setloggedinUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedinUser");

    if (!token) {
      navigate("/login");
      handleError("You must be logged in to access this page");
    } else {
      setloggedinUser(user);
      verifyToken(token);
    }
  }, [navigate]);

  async function verifyToken(token) {
    try {
      const response = await axiosClient.get("/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("==============>", response);
    } catch (error) {
      handleError("Invalid session. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUser");
      navigate("/login");
    }
  }

  async function handlelogout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="w-52 h-full ">
          <Card sx={{ minWidth: 275 }}>{loggedinuser}</Card>
          <button className="bg-red-400 p-3 " onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
