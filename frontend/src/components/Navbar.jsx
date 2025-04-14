import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const navigateTo = useNavigate();
  const [show, setShow] = React.useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const handleLogout = async () => {
    await axios
      .get("https://swasthya-sanjeevani.onrender.com/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const goToLogin = async () => {
    navigateTo("/login");
  };
  return (
    <>
      <nav className="container">
        <div className="logo">SS</div>
        <div className={show ? "navlinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/appointment">Appointment</Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="logoutBtn btn" onClick={goToLogin}>
              Login
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
