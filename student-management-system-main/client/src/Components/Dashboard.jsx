import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import usegetCurrentuser from "../Hooks/usegetCurrentuser";
import DashHero from "../assets/background.svg";
import { IoPeopleSharp } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { CiCirclePlus } from "react-icons/ci";
import StudentProgressGraph from "../pages/StudentProgressGraph";
import PieChart from "../pages/PieChart";

function Dashboard() {
  const { currentuser } = usegetCurrentuser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentuser);
  }, [currentuser]);

  //console.log(user);

  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    isadminAuthenticated,
    setIsAdminAuthenticated,
  } = useContext(Context);

  return (
    <div className="dashboard-container">
      <div className="dash-firstcontainer">
        <div className="dash-child">
          <p>Welcome</p>
          <h2> {user && user.firstName + " " + user.lastName}</h2>
        </div>
        <div className="dash-child2">
          <img src={DashHero} alt="dashboard img" width={"250px"} />
        </div>
      </div>
      <div className="dashboard-seccontiner">
        <div className="dashboard-buttongroup">
          <button className="primary" onClick={() => navigate("/connect")}>
            <IoPeopleSharp className="icon" /> Connect with People
          </button>
          <button className="primary" onClick={() => navigate("/clubs")}>
            <GrGroup className="icon" /> Join Clubs
          </button>
          <button className="primary" onClick={() => navigate("/social")}>
            <CiCirclePlus className="icon" /> Post your Idea's
          </button>

          {/* <button className="primary" onClick={()=>console.log("Add new Club")}>Add New Club</button> */}
          {user && (user.role === "admin" || user.role === "HOD") && (
            <button
              className="primary"
              onClick={() => console.log("add new Club")}
            >
                <CiCirclePlus className="icon" />
              Add new Club
            </button>
          )}
        </div>
      </div>
      <div className="third-container">
        <div className="third-child1">
          <StudentProgressGraph />
        </div>
        <div className="third-child2">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
