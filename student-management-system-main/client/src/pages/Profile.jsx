import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GitHubimg from "../assets/github.png";
import Linkedinimg from "../assets/Linkedin1.webp";
import LeetCodeimg from "../assets/leet.webp";
import HackerRankimg from "../assets/hackerrank1.png";



function Profile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [addSkill, setAddSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [phone, setPhone] = useState("");
  const [rollno, setRollno] = useState("");
  const [bio, setBio] = useState("");

  const [githublink, setGithubLink] = useState("");
  const [linkedinlink, setLinkedinLink] = useState("");
  const [leetcodeLink, setLeetcodeLink] = useState("");
  const [hackerrankLink, setHackerrankLink] = useState("");



  useEffect(() => {
    const fetchUser = async () => {
      try {
      
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/userapil/me",
          {
            withCredentials: true,
          }
        );
     
        if (res.status === 200) {
          //console.log(res.data);
          const userData = res.data.user;
          if (
            userData &&
            userData.firstName &&
            userData.lastName &&
            userData.email &&
            userData.role
          ) {
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setRole(userData.role);
            setGithubLink(userData.socialprofiles[0].github);
            setLinkedinLink(userData.socialprofiles[0].linkedin);
            setLeetcodeLink(userData.socialprofiles[0].leetcode);
            setHackerrankLink(userData.socialprofiles[0].hackerrank);
            setSkillList(userData.skills);
            setPhone(userData.phone);
            setRollno(userData.rollNumber);
            setBio(userData.bio);
          } else {
         
            console.error("User data is incomplete:", userData);
          }
        } else {
     
          console.error("Failed to fetch user data");
        }
      } catch (err) {
   
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []);

  //console.log(githublink, linkedinlink, leetcodeLink, hackerrankLink);

  const handleAddSkill = () => {
    if (addSkill.trim() !== "") {
      setSkillList([...skillList, addSkill]);
      setAddSkill("");
    }
  };

  //console.log(skillList);

  return (
    <div className="dashboard container">
      <h1>Profile</h1>
      <hr />
      <div className="dashsecond container">
        <img
          src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          alt="profile"
        />
        <div>
          <p>
            Welcome, {role}{" "}
            <span>
              {firstName} {lastName}
            </span>
          </p>
          <p>
            Email: <span>{email}</span>
          </p>
          <div className="btn">
            <button className="primary">Report Issue</button>
            <button className="orange">Reset Password</button>
            <button
              className="updatedetails primary"
              onClick={() => navigate("/updateProfile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="bio social profbio">
        <p>
          Phone:
          <span>{phone}</span>
        </p>
        <p>
          Roll:
          <span>{rollno}</span>
        </p>
        <p>
          Bio:
          <span>{bio}</span>
        </p>
      </div>

      <div className="social">
        {/* Social profile links */}
        <p>Social Profiles</p>
        <div className="socialLinks1">
          <label>
            <a href={githublink}>
              <img src={GitHubimg} alt="GitHub" width={"150px"} />
            </a>
            <p className="iconlabel">GitHub</p>
          </label>
          <label>
            <a href={linkedinlink}>
              <img src={Linkedinimg} alt="Linkedin" width={"150px"} />
            </a>
            <p className="iconlabel">Linkedin</p>
          </label>
          <label>
            <a href={leetcodeLink}>
              <img src={LeetCodeimg} alt="LeetCode" width={"150px"} />
            </a>
            <p className="iconlabel">LeetCode</p>
          </label>
          <label>
            <a href={hackerrankLink}>
              <img src={HackerRankimg} alt="HackerRank" width={"150px"} />
            </a>
            <p className="iconlabel">HackerRank</p>
          </label>
        </div>
      </div>

      <div className="Skills skillList">
        <h1>Skills</h1>
        <div className="sk"></div>
        <div className="skillList">
          <ul>
            <li>
              {skillList.map((skill, index) => (
                <li key={index} className="list">
                  {skill}
                </li>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
