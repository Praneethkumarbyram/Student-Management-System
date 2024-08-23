


const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema.js");

const  isAdminAuthonticated = async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin is not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `${req.user.role} is not authorized`,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token",
    });
  }
};


const isUserAuthonticated = async (req, res, next) => {
  const tokenTypes = ['HOD', 'studentToken', 'userToken', 'staffToken','facultyToken'];

  let token = null;
  for (const tokenType of tokenTypes) {
    if (req.cookies[tokenType]) {
      token = req.cookies[tokenType];
      break;
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated..........................",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized",
      });
    }

    next();
    console.log("User Authorized");
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired user token",
    });
  }
};

module.exports = { isAdminAuthonticated, isUserAuthonticated };
