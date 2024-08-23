import React, { useState, useEffect } from "react";
import axios from "axios";

function usegetCurrentuser() {
  const userid = localStorage.getItem("userid");
  const [currentuser, setCurrentuser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/userapil/getpresentuser/${userid}`,
        { withCredentials: true }
      );
      setCurrentuser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (userid) {
      fetchUser();
    }
  }, [userid]);
//console.log(currentuser)
  return { currentuser };
}

export default usegetCurrentuser;
