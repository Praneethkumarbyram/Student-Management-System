import React, { useRef, useState } from "react";
import Lodingimage from "../assets/lodingimage.png";
import { message } from "antd";
import axios from "axios";

function CreatePost() {
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [image, setImage] = useState(null);
  const uploadRef = useRef(null);

  const handleImageClick = () => {
    uploadRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("Avatar", image);
    formData.append("description", description);
    formData.append("comments", comments);
    formData.append("likes", likes);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/userapil/uplodepost",
        formData,
        { withCredentials: true }
      );

  
        message.success(res.data.message);
        setDescription("");
        setComments([]);
        setImage(null);
      
    } catch (err) {
      console.error(err);
      message.error("Failed to upload post");
    }
  };

  return (
    <div className="head post-container">
      <div className="post">
        <div onClick={handleImageClick}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Uploaded" />
          ) : (
            <img src={Lodingimage} alt="Placeholder" />
          )}
          <input
            type="file"
            ref={uploadRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="post-info">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Comments"
          value={comments}
          onChange={(e) => setComments([e.target.value])}
        />
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
