const { Message } = require("../Models/messageSchema.js");
const catchAsyncError = require("../Middlewares/catchAsyncError.js");
const { ErrorHandler, errorMiddleware } = require('../Middlewares/errorMiddleware.js');
 // Add missing import statement


const sendMessage = async (req, res,next) => {

  const { firstName, lastName, email, phone, message } = req.body;
  // console.log({ firstName, lastName, email, phone, message });


  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
      data: { firstName, lastName, email, phone, message },
    });
  }

try{
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
      success: true,
      message: "Message Sent!",
    });
  
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

const getAllMessages = async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
};



module.exports = { sendMessage,getAllMessages };
