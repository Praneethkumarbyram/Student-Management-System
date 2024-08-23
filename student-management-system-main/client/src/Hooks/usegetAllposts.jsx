import React from 'react';
import {useState, useEffect,useCallback} from 'react';
import axios from 'axios';

function usegetAllposts() {
    const [posts, setPosts] = useState([]);
    const fetchallposts =useCallback(async()=>{
        try{
            const res = await axios.get("http://localhost:8080/api/v1/user/getallposts",{withCredentials:true});
            if(res.status===200){
                setPosts(res.data.data);
            }
        }catch(error){
            console.error("Error fetching data:",error);
        }
    },[]);

    useEffect(()=>{
        fetchallposts();
        //console.log(posts);
    }
    ,[fetchallposts]);
   
    return {posts};
}

export default usegetAllposts