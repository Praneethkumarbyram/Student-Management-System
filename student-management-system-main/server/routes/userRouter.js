const express = require("express");
const userRouter = express.Router();
const {
  isAdminAuthonticated,
  isUserAuthonticated,
} = require("../Middlewares/auth.js");

const {
  registration,
  login,
  getallstudentRequest,
  addnewAddmin,
  getAlluserDetails,
  logoutAdmin,
  logoutUser,
  addnewHod,
  getallAdminDetails,
  getallHodDetails,
  getallStaffDetails,
  updateProfile,
  getperticularUser
} = require("../Controller/userController.js");

const {
  addClubs,
  getallclubs,
  deleteClubs,
  joinclubrequest,
} = require("../Controller/clubController.js");

const { uploadPost,getallposts } = require("../Controller/mediaController.js");

//const {getallAdminDetails} =require('../Controller/adminController.js');

userRouter.post("/registration", registration);

userRouter.post("/login", login);
//userRouter.get('/admin/addnew',addnewAddmin);

userRouter.get("/students", getallstudentRequest);

// Added a new route for addnewAddmin
userRouter.post("/admin/addnew", isAdminAuthonticated, addnewAddmin);

userRouter.get("/admin/me", isAdminAuthonticated, getAlluserDetails);

userRouter.get("/userapil/me", isUserAuthonticated, getAlluserDetails);

userRouter.get("/admin/logout", isAdminAuthonticated, logoutAdmin);

userRouter.get("/userapil/logout", isUserAuthonticated, logoutUser);

userRouter.post("/hod/addnewhod", isAdminAuthonticated, addnewHod);

userRouter.get("/admin/getalladmin", isAdminAuthonticated, getallAdminDetails);

userRouter.get("/admin/getallhod", isAdminAuthonticated, getallHodDetails);

userRouter.get("/admin/getallstaff", isAdminAuthonticated, getallStaffDetails);

userRouter.post("/userapil/updateprofile", isUserAuthonticated, updateProfile);

// Added a new route for addClubs

userRouter.post("/admin/addclubs", isAdminAuthonticated, addClubs);

userRouter.get("/admin/getallclubs", isAdminAuthonticated, getallclubs);

userRouter.get("/userapil/getallclubs", isUserAuthonticated, getallclubs);

userRouter.post("/hod/addclubs", isAdminAuthonticated, addClubs);

userRouter.post("/hod/deleteclub", isUserAuthonticated, deleteClubs);

userRouter.post("/admin/deleteclub", isAdminAuthonticated, deleteClubs);

userRouter.post("/userapil/joinclub", isUserAuthonticated, joinclubrequest);

// Added a new route for uplodepost

userRouter.post("/userapil/uplodepost", isUserAuthonticated, uploadPost);


//get perticular user details
userRouter.get("/userapil/getpresentuser/:_id", isUserAuthonticated, getperticularUser);

//get all posts
userRouter.get("/getallposts", getallposts);  


module.exports = userRouter;
