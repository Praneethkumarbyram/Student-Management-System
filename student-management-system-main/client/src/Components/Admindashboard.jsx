import React, { useState, useEffect } from "react";
import "./adminStyle.css";
import Numberanimation from "./Numberanimation";
import { Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usegetStudent from "../Hooks/usegetStudent";
import  usegetAdmins  from "../Hooks/usegetAdmins";
//import usegetallHods from "../Hooks/usegetallHods";
import  usegetallHods  from "../Hooks/usegetallHods";
import usegetallStaff from "../Hooks/usegetallStaff";

function Admindashboard() {
  const [applications, setApplications] = useState([]);


 //custom hook to get students
 
  const { admins,totalAdmins } = usegetAdmins([]);
  const { students, totalStudents } = usegetStudent(
    "http://localhost:8080/api/v1/user/students"
  );
  const {hod,totalhod} = usegetallHods([]);
const {staff,totalStaff} = usegetallStaff([]);
console.log(staff);
  console.log(totalStaff);

//console.log(admins);
  //console.log(students);
  
  //console.log(hod);
  //console.log(totalhod);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/application/admin/getallapplications",
          { withCredentials: true }
        );
        if (res.status === 200) {
          setApplications(res.data.appApplications);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Department",
      dataIndex: "HodDepartment",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          {record.status === "Reject" ? (
            <button
              className="btngroup btn-success"
              onClick={() => handleAccountStatus(record, "Approved")}
            >
              Approve
            </button>
          ) : record.status === "Pending" ? (
            <button
              className="btngroup btn-success"
              onClick={() => handleAccountStatus(record, "Approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="btngroup btn-danger"
              onClick={() => handleRejustStatus(record, "Reject")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  const studentColumns = [
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Department",
      dataIndex: "HodDepartment",
    },
  ];

const adminColumns = [
    
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
   
  ];


  const handleAccountStatus = async (record, status) => {
    try {
      const { _id, HodDepartment, role } = record;
      console.log(HodDepartment, role);
      const response = await axios.post(
        "http://localhost:8080/api/v1/application/admin/updateapplicationstatus",
        { status, applicatid: _id, HodDepartment, role },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Status updated successfully");
        message.success(response.data.message);
        setApplications((prevState) =>
          prevState.map((application) =>
            application._id === _id ? { ...application, status } : application
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRejustStatus = async (record, status) => {
    try {
      const { _id, HodDepartment, role } = record;
      const res = await axios.post(
        "http://localhost:8080/api/v1/application/admin/updateapplicationstatus",
        { status, applicatid: _id, HodDepartment, role },
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("Status updated successfully");
        message.success(res.data.message);
        setApplications((prevState) =>
          prevState.map((application) =>
            application._id === record._id
              ? { ...application, status }
              : application
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admindash">
      <div className="admind">
        <br />
        <p>Welcome Admin</p>
        <hr />
      </div>
      <div className="admindashcontent">
        <div className="firstcontainer">
          <div className="admindashcontent1 firstcon">
            <p>Total no of application</p>
            <Numberanimation number={56} duration={10} />
          </div>
          <div className="admindashcontent2 firstcon">
            <p>Total no of students</p>
            <Numberanimation number={40} duration={10} />
          </div>
          <div className="admindashcontent3 firstcon">
            <p>Total no of courses</p>
            <Numberanimation number={60} duration={10} />
          </div>
          <div className="admindashcontent4 firstcon">
            <p>Total no of users</p>
            <Numberanimation number={99} duration={10} />
          </div>
          <div className="admindashcontent5 firstcon">
            <p>Total no of Organizations</p>
            <Numberanimation number={50} duration={10} />
          </div>
        </div>
        <div className="middlecon container btngroup">
          <button>Add Course</button>
          <button onClick={() => navigate("/addnewadmin")}>Add Admin</button>
          <button>Add Organization</button>
          <button>Add Student</button>
          <button>Delete User</button>
          <button>Add new Club</button>
        </div>
        <div className="secondcontainer">
          <h2>Active Applications</h2>
          <br />
          <Table
            columns={columns}
            dataSource={applications}
            scroll={{ x: "min-content" }}
            pagination={{ pageSize: 6 }}
          />
        </div>

        <div className="thirdcontainer">
          <div>
            <h2>Students</h2>
      
            <p>Students Count : {totalStudents}</p>
            <Table
              columns={studentColumns}
              dataSource={students}
              scroll={{ x: "min-content" }}
            />
          </div>
          <div>
            <h2>HOD's</h2>
       
            <p>HOD's Count : {totalhod}</p>
            <Table
              columns={studentColumns}
              dataSource={hod}
              scroll={{ x: "min-content" }}
            />
          </div>
          

        </div>



        <div className="thirdcontainer">
        <div>
            <h2>Staff</h2>
       
            <p>Staff Count : {totalStaff}</p>
            <Table
              columns={studentColumns}
              dataSource={staff}
              scroll={{ x: "min-content" }}
            />
          </div>
          <div>
            <h2>Admins</h2>
      
            <p>Admins Count : {totalAdmins}</p>
            <Table
              columns={adminColumns}
              dataSource={admins}
              scroll={{ x: "min-content" }}
            />
          </div>
          
          

        </div>

      </div>
    </div>
  );
}

export default Admindashboard;
