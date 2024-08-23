import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Updateprofile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phonne, setPhone] = useState("");
  const [rollno, setRollno] = useState("");
  const [bio, setBio] = useState("");

  const [githublink, setGithubLink] = useState("");
  const [linkedinlink, setLinkedinLink] = useState("");
  const [leetcodeLink, setLeetcodeLink] = useState("");
  const [hackerrankLink, setHackerrankLink] = useState("");

  const [addSkill, setAddSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const skillSuggestions = [
    "C",
    "Java",
    "Python",
    "C++",
    "C#",
    "ReactJS",
    "Angular",
    "Rust",
    "Web Developer",
    "NodeJS",
    "ExpressJS",
    "MongoDB",
    "SQL",
    "NoSQL",
    "Django",
    "Flask",
    "Machine Learning",
  ];

  const [socialprofile, setSocial] = useState({
    github: githublink,
    linkedin: linkedinlink,
    leetcode: leetcodeLink,
    hackerrank: hackerrankLink,
  });
  //console.log(socialprofile);

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
          const userData = res.data.user;
          //console.log("userdata: ",userData);
          if (
            userData &&
            userData.firstName &&
            userData.lastName &&
            userData.email &&
            userData.role &&
            userData.skills &&
            userData.socialprofiles
          ) {
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setRole(userData.role);
            setSkillList(userData.skills);
            setSocial(userData.socialprofiles);
            setGithubLink(userData.socialprofiles[0].github);
            setLinkedinLink(userData.socialprofiles[0].linkedin);
            setLeetcodeLink(userData.socialprofiles[0].leetcode);
            setHackerrankLink(userData.socialprofiles[0].hackerrank);
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

  const handleAddSkill = () => {
    if (addSkill.trim() !== "") {
      setSkillList([...skillList, addSkill]);
      setAddSkill("");
    }
  };

  const handleUpdate = async () => {
    console.log("Updating profile...");
    //console.log((firstName, lastName, email, role, githublink, linkedinlink, leetcodeLink, hackerrankLink, skillList))

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/userapil/updateprofile",
        {
          firstName,
          lastName,
          email,
          role,
          socialprofiles: {
            github: githublink,
            linkedin: linkedinlink,
            leetcode: leetcodeLink,
            hackerrank: hackerrankLink,
          },
          skills: skillList,
          phone: phonne,
          rollno: rollno,
          bio: bio,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        console.log("Profile Updated Successfully");
        message.success("Profile Updated Successfully");
      }
    } catch (err) {
      //console.log(soicalprofile);
      console.error("Error updating profile:", err);
      message.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="dashboard container">
      <h1>Updateprofile</h1>
      <hr />
      <div className="dashsecond container cont1">
        <img
          src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          alt="profile"
        />
        <div className="cont2">
          <p>
            Welcome, {role}{" "}
            <span>
              <div className="updateprofcon1">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
      <div className="bio social">
      <p>
            Phone:{" "}
            <span>
              <input
                type="number"
                value={phonne}
                onChange={(e) => setPhone(e.target.value)}
                className="inputedit"
              />
            </span>
          </p>
          <p>
            Roll No:{" "}
            <span>
              <input
                type="text"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
                className="inputedit"
              />
            </span>
          </p>

          <p>
            Bio:{" "}
            <span>
              <textarea
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="inputedit"
              />
            </span>
          </p>
          
        </div>

      <div className="social">
        {/* Social profile links */}
        <p>Social Profiles</p>
        <label>
          GitHub
          <input
            type="link"
            placeholder="Enter your profile Link"
            value={githublink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </label>
        <label>
          Linkedin
          <input
            type="link"
            placeholder="Enter your profile Link"
            value={linkedinlink}
            onChange={(e) => setLinkedinLink(e.target.value)}
          />
        </label>
        <label>
          LeetCode
          <input
            type="link"
            placeholder="Enter your profile Link"
            value={leetcodeLink}
            onChange={(e) => setLeetcodeLink(e.target.value)}
          />
        </label>
        <label>
          HackerRank
          <input
            type="link"
            placeholder="Enter your profile Link"
            value={hackerrankLink}
            onChange={(e) => setHackerrankLink(e.target.value)}
          />
        </label>
      </div>

      <div className="Skills skillList">
        <h1>Skills</h1>
        <div className="sk">
          <input
            type="text"
            placeholder="Enter Your Skill"
            list="skillSuggestions"
            value={addSkill}
            onChange={(e) => setAddSkill(e.target.value)}
          />
          <datalist id="skillSuggestions">
            {skillSuggestions.map((skill, index) => (
              <option key={index} value={skill} />
            ))}
          </datalist>
          <div className="btn">
            <button onClick={handleAddSkill} className="primary">
              +Add
            </button>
          </div>
        </div>
        <div className="skillList">
          <h5>List</h5>
          <ul>
            {skillList.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="btn dashbtn">
        <button className="primary" onClick={handleUpdate}>
          {" "}
          Save
        </button>
      </div>
    </div>
  );
}

export default Updateprofile;
