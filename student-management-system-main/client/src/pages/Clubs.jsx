import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import clubsimg from "../assets/clubs.jpeg";
import { useNavigate } from "react-router-dom";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/userapil/getallclubs",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setClubs(response.data.clubs);
      } catch (err) {
        message.error(err.message);
        console.log(err);
      }
    };

    fetchClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    console.log("clubId: ", clubId);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/userapil/joinclub",
        JSON.stringify({ clubId }),

        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("res: ", res);
      console.log(clubId);
      message.success(res.data.message);
    } catch (err) {
      console.log(err);
      message.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="head">
        <h2>Clubs</h2>
        <p>Join the club of your choice</p>
        <hr />
      </div>
      <div className="clubs-container">
        {clubs.map((club) => (
          <div className="clubcard" key={club._id}>
            <img src={clubsimg} alt="Club img" />
            <h2>{club.clubName}</h2>
            <p>Description: {club.description}</p>
            <p>President: {club.president.name}</p>
            <p>Vice President: {club.vicePresident.name}</p>
            <p>Advisor: {club.advisor.name}</p>
            {/* <p>Members:</p> */}
            {/* <ul>
              {club.members.map((member) => (
                <li key={member._id}>
                  {member.name} - {member.year} - {member.major}
                </li>
              ))}
              <a href="#">more..</a>
            </ul> */}
            <p>Events:</p>
            <ul>
              {club.events.map((event) => (
                <li key={event._id}>
                  {event.eventName} - {event.date} - {event.time} -{" "}
                  {event.location}
                </li>
              ))}
            </ul>
            <button onClick={() => handleJoinClub(club._id)}>Join Club</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Clubs;
