import React, { useContext, useState } from "react";
import { User, Mail, Lock, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          setTimeout(() => {
            navigate("/dashboard");
          }, 0);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          setTimeout(() => {
            navigate("/dashboard");
          }, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
      style={{ zIndex: 1000 }}
      onClick={handleClose}
    >
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-5 py-2 flex items-center gap-2 rounded-lg mt-5">
            <User className="h-4 w-4" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm"
              required
            />
          </div>
        )}

        <div className="border px-5 py-2 flex items-center gap-2 rounded-lg mt-4">
          <Mail className="h-4 w-4" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email address"
            className="outline-none text-sm"
            required
          />
        </div>
        <div className="border px-5 py-2 flex items-center gap-2 rounded-lg mt-4">
          <Lock className="h-4 w-4" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="outline-none text-sm"
            required
          />
        </div>

        <p className="text-sm text-red-600 my-4 cursor-pointer hover:text-red-800">
          Forgot password?
        </p>
        <button className="bg-black w-full text-white py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
          {state === "Login" ? "Login" : "Create account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-red-600 cursor-pointer hover:text-red-800"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-red-600 cursor-pointer hover:text-red-800"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
        <X
          onClick={handleClose}
          className="absolute top-3 right-3 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
