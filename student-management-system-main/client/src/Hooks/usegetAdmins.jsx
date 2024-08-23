import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

function usegetAdmins() {
    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
// Initialize totalAdmins with 0

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/admin/getalladmin", { withCredentials: true });
            if (res.status === 200) {
                setAdmins(res.data.admin);
                setTotalAdmins(res.data.admin.length);
                //console.log(res.data)
                //console.log(totalAdmins)
                 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []); // useCallback with url as dependency

    useEffect(() => {
        fetchData(); // Call fetchData function inside useEffect
    }, [fetchData]); // useEffect with fetchData as dependency

    return { admins, totalAdmins };
}

export default usegetAdmins;
