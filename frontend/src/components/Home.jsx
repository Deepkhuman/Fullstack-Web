import { Box, Card } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const toastShownRef = useRef(false);
  const navigate = useNavigate();

  async function handlelogout() {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="w-52 h-full ">
          <Card sx={{ minWidth: 275 }}>Welcome</Card>
          <button className="bg-red-400 p-3 " onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
