import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navRaf = useRef(null);
  const navigate = useNavigate();
  const [check, setCheck] = React.useState(false);

 useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
    setCheck(true) // Redirect to home if the user is authenticated
      } else {
        setCheck(false) // Redirect to login if the user is not authenticated
      }
    });
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRaf.current) {
        if (window.scrollY >= 80) {
          navRaf.current.classList.add("nav-dark");
        } else {
          navRaf.current.classList.remove("nav-dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();

     navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div ref={navRaf} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
  {check ? (
    <p onClick={handleLogout}>Sign out of Netflix</p>
  ) : (
    <p onClick={() => navigate("/login")}>Sign in to Netflix</p>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
