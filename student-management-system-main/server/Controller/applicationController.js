const { Application } = require("../Models/applicationSchema.js");
const User = require("../Models/userSchema.js");

const postApplication = async (req, res) => {
  const { firstName, lastName, email, role, HodDepartment, rollNumber } =
    req.body;

  // Check if all required fields are present
  if (
    !firstName ||
    !lastName ||
    !email ||
    !HodDepartment ||
    !role ||
    !rollNumber
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if user's role is "user"
    if (user.role !== "user") {
      return res
        .status(403)
        .send(`You are not authorized to apply for this ${req.body.role} role`);
    }

    // Create application
    const application = await Application.create({
      firstName,
      lastName,
      email,
      role,
      HodDepartment,
      rollNumber,
      Id: user._id, // Store the user's ID in the application document
    });

    //console.log(application);

    res.status(201).send("Application sent successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error while sending Message ${error.message}`,
    });
  }
};

//get all Applications

const getallApplications = async (req, res, next) => {
  try {
    const appApplication = await Application.find({});
    res.status(200).json({
      success: true,
      message: "All Applications",
      appApplications: appApplication,
    });
  } catch (er) {
    res.status(400).json({
      success: false,
      message: "error while fetching all messages",
    });
  }
};

//--------------------------------------------------------------------------------------------------

// Update application status
const updateapplicationstatus = async (req, res) => {
  const { status, applicatid, HodDepartment, role } = req.body;
  //console.log(HodDepartment, role);

  try {
    const appApplication = await Application.findById(applicatid);
    const user = await User.findById(appApplication.Id);
    console.log("user Id", appApplication.Id);
    console.log(appApplication.rollNumber);
    const rollNumber=appApplication.rollNumber;
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the application exists
    if (!appApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update application status
    const updatedApplication = await Application.findByIdAndUpdate(applicatid, {
      status,
    });

    // Update user's HodDepartment and role
    const updatedUser = await User.findByIdAndUpdate(appApplication.Id, {
      HodDepartment,
      role,
      rollNumber
    });

    

    //console.log(updatedUser);

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
      user: updatedUser,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating application status",
    });
  }
};




module.exports = {
  postApplication,
  getallApplications,
  updateapplicationstatus,
};
