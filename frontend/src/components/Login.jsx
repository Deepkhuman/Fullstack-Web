import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../Axios/axiosClient";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/login", data);
      console.log(response);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("---------------->", error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto mt-32 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">Login </h2>
          <span className="mb-4 text-sm/[15px] text-blue-500">
            <Link to={"/signup"}>Don't have an account?</Link>
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                {...register("password")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Keep me sign in</span>
            </label>
            <a href="#" className="text-blue-500">
              Forgot Password?
            </a>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
        <div className="text-center my-4">
          <span className="text-gray-500">Login with</span>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <img
              src="https://storage.googleapis.com/a1aa/image/BKaI89kL9Xr5JFRxHGsPnkv2fApCNMfVf71L7fKv4dU5zXcPB.jpg"
              alt="Google logo"
              width="20"
              height="20"
            />
            Google
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <img
              src="https://storage.googleapis.com/a1aa/image/eg4UBHYoXXQwPa897D31zC7vLwCzsdaX1ZeTMbtdOiVf5LunA.jpg"
              alt="Twitter logo"
              className="mr-2"
              width="20"
              height="20"
            />
            Twitter
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <img
              src="https://storage.googleapis.com/a1aa/image/sRDi09Zlrl5lFd2fVeybLd0heQgNPzus4RSlx4yd9FM45LunA.jpg"
              alt="Facebook logo"
              className="mr-2"
              width="20"
              height="20"
            />
            Facebook
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;