import axios from "axios";
import React, { useContext, useState } from "react";

import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { message as msg } from "antd";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated,isadminAuthenticated, setIsAdminAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigateTo = useNavigate();
  localStorage.setItem("Email", email);

  const handleLogin = async (e) => {
   
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      msg.success("Login Successfull");
  //     console.log(res);
  //  console.log(res.data)
   localStorage.setItem("userid",res.data.user._id);
      if (res.data.user.role === "admin") {
        setIsAdminAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
      navigateTo("/");

      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.log(error);
      msg.error("Login Failed");
    }
  };

  if (isAuthenticated || isadminAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
