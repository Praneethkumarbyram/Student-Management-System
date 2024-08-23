const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const Media = require("../Models/mediaSchema.js");
const User = require("../Models/userSchema.js");

const uploadPost = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded", success: false });
  }

  const { Avatar } = req.files;
  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedFormats.includes(Avatar.mimetype)) {
    return res.status(400).json({ message: "Invalid file format", success: false });
  }

  const {description, likes, comments } = req.body;
  if (!description || !likes || !comments) {
    return res.status(400).json({ message: "Please fill all the fields", success: false });
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(Avatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
      return res.status(500).json({ message: "Failed to upload image to Cloudinary", success: false });
    }

    const newAvatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };

    const newPost = await Media.create({
      name: `${req.user.firstName} ${req.user.lastName}`,
      Avatar: newAvatar,
      description,
      likes,
      comments,
    });

    if (!newPost) {
      return res.status(500).json({ message: "Failed to upload post", success: false });
    }

    res.status(201).json({ message: "Post uploaded successfully", success: true, data: newPost });
  } catch (error) {
    console.error("Error uploading post:", error);
    res.status(500).json({ message: "Failed to upload post", success: false });
  }
};


const getallposts = async(req,res,next)=>{
  try{
    const posts= await Media.find({});
    res.status(200).json({message:"All posts",success:true,data:posts});
  }catch(err){
    console.error("Error getting posts:",err);
    res.status(500).json({message:"Failed to get posts",success:false});
  }

}


module.exports = { uploadPost,getallposts };
