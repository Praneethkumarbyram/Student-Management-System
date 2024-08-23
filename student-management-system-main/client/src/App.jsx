import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Application from "./pages/Applycation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./Components/Navbar";
import { Context } from "./main";
import axios from "axios";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import AdminDashboard from "./Components/Admindashboard";
import AddNewAdmin from "./pages/Addnewadmin";
import Updateprofile from "./pages/Updateprofile";
import Conetcpeople from "./pages/Connectpeople";
import Clubs from "./pages/Clubs";
import Socialmedia from "./pages/Socialmedia";
import Createpost from "./pages/Creactepost";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    isadminAuthenticated,
    setIsAdminAuthenticated,
    setAdmin
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/userapil/me", { withCredentials: true });
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/admin/me", { withCredentials: true });
        if (res.status === 200) {
          setIsAdminAuthenticated(true);
          setAdmin(res.data);
        }
      } catch (err) {
        console.log(err);
        setIsAdminAuthenticated(false);
        setAdmin({});
      }
    };
    fetchAdmin();
  }, [isadminAuthenticated, setIsAdminAuthenticated, setAdmin]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/application" element={<Application />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connect" element={<Conetcpeople />} />
          <Route path='/clubs' element={<Clubs />} />
          <Route path="/social" element={<Socialmedia />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/addnewadmin" element={<AddNewAdmin />} />
          <Route path="/updateProfile" element={<Updateprofile />} />
          <Route path="/profile" element={<Profile />} />
          {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
          {isadminAuthenticated && <Route path="/admindashboard" element={<AdminDashboard />} />}
        </Routes>
   
      </Router>
    </>
  );
};

export default App;
