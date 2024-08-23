import React from "react";

function Connectpeople() {
  return (
    <div className="connect-conatiner">
      <h4>Connect To people</h4>
      <div className="search-people">
        <input type="text" placeholder="Search people" />
        <button>Search</button>
      </div>
      <div className="people-list">
        <div className="people">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
          />
          <div className="cardlist">
            <p>John Doe</p>
            <span>CEO at Google</span>
            <p>Skills</p>
            <ul>
              <li>C++</li>
              <li>C#</li>
              <li>Java</li>
              <li>Python</li>
              <li>Web dev</li>
              <li>Dev Opps</li>
            </ul>
          </div>
  
            <button>Connect</button>
            <button>Profile</button>
       
        </div>
      </div>
    </div>
  );
}

export default Connectpeople;
