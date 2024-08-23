import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function usegetStudent(url) {
    const [students, setStudents] = useState([]);
const [totalStudents,setTotalStudents]=useState([]); // 
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(url, { withCredentials: true });
            if (res.status === 200) {
                setStudents(res.data.allstudents);
                setTotalStudents(res.data.allstudents.length);
                //console.log(totalStudents) //
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [url]); // useCallback with url as dependency

    useEffect(() => {
        fetchData(); // Call fetchData function inside useEffect
    }, [fetchData]); // useEffect with fetchData as dependency

    return { students,totalStudents };
}

export default usegetStudent;
