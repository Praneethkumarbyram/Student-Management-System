import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Footer from '../Components/Footer';


function Application() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [HodDepartment, setHodDepartment] = useState('');
  const [rollNumber, setrollNumber] = useState('');
 
  const roleSuggestions = ["HOD","staff","student"];
  const hodSuggestions = ["CSE","ECE","DS","IT","EEE","MECH","CIVIL"]; // Add your departments here

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const res = await axios.post("http://localhost:8080/api/v1/application/postApplication", {
        firstName,
        lastName,
        email,
        role,
        HodDepartment,
        rollNumber
      }, {
        withCredentials: true
      });
      
      if (res.status === 201) {
        console.log('Application sent successfully');
        message.success('Application sent successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('');
        setHodDepartment('');
        setrollNumber('');
      }
    

    } catch (err) {
     
      console.error(err);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="container form-component appli">
        <h2>Send Us A Application</h2>
        <form onSubmit={handleSubmit}>
          <div className='inp'>
            <input 
            type='text'
            placeholder='Roll Number'
            required
            value={rollNumber}
            onChange={(e) => setrollNumber(e.target.value)}
            />
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
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              list="roleSuggestions"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <datalist id="roleSuggestions">
              {roleSuggestions.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>
            <input
              type="text"
              placeholder="Department"
              list="hodSuggestions"
              value={HodDepartment}
              onChange={(e) => setHodDepartment(e.target.value)}
            />
            <datalist id="hodSuggestions">
              {hodSuggestions.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>
          </div>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Application;
