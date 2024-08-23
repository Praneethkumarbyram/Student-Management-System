import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import {useNavigate} from 'react-router-dom';

const Footer = () => {
const navigateTo = useNavigate();
  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
        
          <div className="logo logocon" onClick={()=> naviagteTo('/')}>
        <PiStudentDuotone className="ico"/>
          <p className="logo-img">StudentHub</p>
        </div>
          
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>studenthub@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>India, Telangana</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;