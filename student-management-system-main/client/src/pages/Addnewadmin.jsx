import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios"; // Add axios import

function Addnewadmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addnewAdminfun = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/admin/addnew",
        { firstName, lastName, phone, email, password },
        {
          withCredentials: true, // Correct typo
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      message.success(res.data.message);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setConfirmPassword("");
    } catch (er) {
      console.log(er);
      message.error(er.response.data.message); // Access error message from response
    }
  };

  return (
    <div className="container form-component login-form">
      <h2>Add New Admin</h2>

      <form onSubmit={addnewAdminfun}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 10 }}>Not Registered?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Add Admin</button>
        </div>
      </form>
    </div>
  );
}

export default Addnewadmin;
