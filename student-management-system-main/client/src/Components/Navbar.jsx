import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { Context } from "../main";
import { message } from "antd";
import { PiStudentDuotone } from "react-icons/pi";
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown
  const {
    isAuthenticated,
    setIsAuthenticated,
    isadminAuthenticated,
    setIsAdminAuthenticated,
  } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let logoutEndpoint = isadminAuthenticated
        ? "admin/logout"
        : "userapil/logout";
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/${logoutEndpoint}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        message.success("Logout Successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("Email");
        localStorage.removeItem("userid");
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      message.error("Logout Failed");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="container">
      <div className="logo">
        <PiStudentDuotone />
        <p className="logo-img">StudentHub</p>
      </div>
      <div className={`navLinks ${show ? "showmenu" : ""}`}>
        <div className="links">
          <Link to="/" onClick={() => setShow(!show)}>
            Home
          </Link>
          <Link to="/application" onClick={() => setShow(!show)}>
            Application
          </Link>
          <Link to="/about" onClick={() => setShow(!show)}>
            About Us
          </Link>

          {(isAuthenticated || isadminAuthenticated) && (
            <Link to="/profile" onClick={() => setShow(!show)}>
              Profile
            </Link>
          )}

          {isAuthenticated && !isadminAuthenticated && (
            <Link to="/dashboard" onClick={() => setShow(!show)}>
              Dashboard
            </Link>
          )}

          {isadminAuthenticated && (
            <Link to="/admindashboard" onClick={() => setShow(!show)}>
              Dashboard
            </Link>
          )}

          <div className="dropdown" onClick={toggleDropdown}>
            <Link>More</Link>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/page1">Page 1</Link>
                <Link to="/page2">Page 2</Link>
                {/* Add more dropdown items as needed */}
              </div>
            )}
          </div>
        </div>

        {isAuthenticated || isadminAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="bell-con">
        <MdNotificationsActive />
        <MdNotificationAdd />
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
