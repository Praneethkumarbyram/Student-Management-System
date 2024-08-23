const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const messageRouter = require('./routes/messageRouter');
const errorMiddleware = require('./Middlewares/errorMiddleware.js');
const userRouter = require('./routes/userRouter.js');
const applicationRouter = require('./routes/applicationRouter.js');
// index.js

// Import adminRouter with correct case
//const adminRouter = require('./routes/adminRouter.js');





dotenv.config({ path: './config/config.env' });

// Config cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to dbs
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MONGO-DB database');
    })
    .catch((err) => {
        console.log("Error in connecting to db");
        console.log(err);
    });

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
//app.use('/api/v1/adminroute',adminRouter);




app.use(errorMiddleware.errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);


module.exports =(req,res)=>{
    res.status(200).json({message:"Hello from server"});
}





// module.exports =(req,res)=>{
//     res.status(200).json({message:"Hello from server"});
// }


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});





