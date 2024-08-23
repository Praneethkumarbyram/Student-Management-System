const Club = require("../Models/Clubs.js");
const User = require("../Models/userSchema.js");
const {clubrequest} = require("../Models/clubrequest");

// Add clubs-----------------------------------------------------------------------------------------------------------------
const addClubs = async (req, res) => {
  try {
    const {
      clubName,
      clubDescription,
      president,
      vicePresident,
      advisor,
      members,
      events,
    } = req.body;

    //console.log(req.body);

    if (
      !clubName ||
      !clubDescription ||
      !president ||
      !vicePresident ||
      !advisor ||
      !members ||
      !events
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const newClub = await Club.create({
      clubName,
      clubDescription,
      president,
      vicePresident,
      advisor,
      members,
      events,
    });

    res.status(200).json({
      success: true,
      club: newClub,
      message: "Club created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Club creation failed",
    });
  }
};

// Get all clubs-----------------------------------------------------------------------------------------------------------------
const getallclubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({
      success: true,
      clubs: clubs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get all club details",
    });
  }
};

// Delete club-----------------------------------------------------------------------------------------------------------------

const deleteClubs = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete club",
    });
  }
};


// Join club request-----------------------------------------------------------------------------------------------------------------

const joinclubrequest = async (req, res) => {
    try {
      const { clubId } = req.body;
      const userId = req.user._id;
  
      // Check if the club exists
      const club = await Club.findById(clubId);
      if (!club) {
        return res.status(404).json({
          success: false,
          message: "Club not found"
        });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Check if the user is already a member of the club
      const isMember = club.members.some(member => member.userId === userId);
      if (isMember) {
        return res.status(400).json({
          success: false,
          message: "You are already a member of this club"
        });
      }
  
      // Check if the user has already sent a request to join the club
      const isRequest = await clubrequest.findOne({ userEmail: user.email, clubName: club.clubName });
      if (isRequest) {
        return res.status(400).json({
          success: false,
          message: "You have already sent a request"
        });
      }
  
      // Create a new join club request
      const newJoinRequest = await clubrequest.create({
        clubName: club.clubName,
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.HodDepartment,
        userSkills: user.skills
      });
  
      res.status(200).json({
        success: true,
        message: "Request sent successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to send request"
      });
    }
  };
  

module.exports = { addClubs, getallclubs, deleteClubs,joinclubrequest };
