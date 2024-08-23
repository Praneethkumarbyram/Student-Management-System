import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {message as msg} from 'antd';
import graph from "../assets/graph (1).png";


const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");




  const handleMessage = async (e) => {


    e.preventDefault();
if(!firstName || !email || !message || !phone){
toast.error("Please fill all the fields");
}

    try {
      console.log("in try block");
    
      const res=await axios.post("https://studenthubserver.netlify.app/api/v1/message/send", { firstName, lastName, email, phone, message }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

    
      msg.success("Message Sent Successfully");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        

    } catch (error) {
      console.log(error);
      msg.error("Message Failed");
  
    }
  };

  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
         
        </form>
        <img src={graph} alt="vector" />
      </div>
     
    </>
  );
};

export default MessageForm;