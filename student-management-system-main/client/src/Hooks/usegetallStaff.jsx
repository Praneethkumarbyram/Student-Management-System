import React,{useState,useEffect,useCallback} from 'react';
import axios from 'axios';

function usegetallStaff() {
    const [staff, setStaff] = useState([]);
    const [totalStaff, setTotalStaff] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/admin/getallstaff", { withCredentials: true });
            if (res.status === 200) {
                setStaff(res.data.staff);
                setTotalStaff(res.data.staff.length);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []); 

    useEffect(() => {
        fetchData(); 
    }, [fetchData]); 

    return { staff, totalStaff };
}

export default usegetallStaff;