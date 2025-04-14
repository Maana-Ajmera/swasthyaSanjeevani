import React, { useContext } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://swasthya-sanjeevani.onrender.com/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please login to continue</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
        asperiores quia. Molestias maiores a minima?
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div
          style={{ gap: "10px", justifyContent: "flex", flexDirection: "row" }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
