import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

function usegetallHods() {
    const [hod, setHod] = useState([]);
    const [totalhod, setTotalhod] = useState(0);
    
// Initialize totalAdmins with 0

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/admin/getallhod", { withCredentials: true });
            if (res.status === 200) {
                setHod(res.data.hod);
                setTotalhod(res.data.hod.length);
                //console.log(res.data)
                //console.log(totalhod)
                 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []); // useCallback with url as dependency

    useEffect(() => {
        fetchData(); // Call fetchData function inside useEffect
    }, [fetchData]); // useEffect with fetchData as 
    

//console.log("Hods",hod);
//console.log("Total Hods",totalhod);
    return { hod, totalhod };
}

export default usegetallHods;
