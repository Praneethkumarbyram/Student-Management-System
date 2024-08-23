import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import { TiSocialInstagram } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import usegetAllposts from "../Hooks/usegetAllposts";

function Socialmedia() {
  const navigate = useNavigate();
  const { posts } = usegetAllposts();

  return (
    <div className="head head2">
      <div className="social-firstcon">
        <div className="sidebar">
          <p className="medialogo">
            <TiSocialInstagram />
            Media
          </p>
          <ul>
            <li>
              <GoHomeFill className="icon" />
              <span>Home</span>
            </li>
            <li>
              <FaSearch className="icon" />
              <span>Search</span>
            </li>
            <li onClick={() => navigate("/createpost")}>
              <MdAddCircleOutline className="icon" />
              <span>Post</span>
            </li>
            <li>
              <TbMessage className="icon" />
              <span>Message</span>
            </li>
          </ul>
        </div>
        <div className="media-secondcon">
          {posts.map((post) => (
            <div className="media-card" key={post.id}>
              <div className="media-card-header">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt={post.username}
                />
                <span>{post.name}</span>
                <button>Follow</button>
              </div>
              <img src={post.Avatar.url} alt={post.description} />
              <span className="descr">
                <span>Description</span>
                <span className="com1">{post.description}</span>
              </span>
              <div className="likemessshare">
                <span className="likes">
                  <FaHeart />
                  <span>{post.likes}</span>
                </span>
                <BiMessageSquareDetail />
              </div>
              <div>
                <ul className="comments-list">
                  {post.comments.map((comment, index) => (
                    <d key={index}>{comment}</d>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="media-thirdcon"></div>
      </div>
    </div>
  );
}

export default Socialmedia;
