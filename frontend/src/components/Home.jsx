import { Box, Card } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [loggedinuser, setloggedinUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setloggedinUser(localStorage.getItem("loggedinUSer"));
  }, []);

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
