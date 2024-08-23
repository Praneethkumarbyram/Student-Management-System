const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    rollNumber:{
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "invalid First name"],
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "invalid Last name"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email",
        },
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, "invalid phone number"],
        maxlength: [10, "invalid phone number"]
    },
    

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [8, "Password must contain at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "HOD", "staff", "student"],
        default: "user"
    },
    socialprofiles: {
        type: Array,
        default: []
    },

    skills:{
        type: Array,
        default: []
    
    },
    bio:{
        type: String,
        default: ""
    },

    HodDepartment: {
        type: String,
        enum: ["CSE", "ECE", "DS", "IT", "EEE", "MECH", "CIVIL","Pending"],
        default: "Pending"
    },
    Avatar: { // Corrected field name
        public_id: String,
        url: String,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        return next(error); // Handle any error during password hashing
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error; // Handle any error during password comparison
    }
};

userSchema.methods.generateJsonWebToken = function () {
    try {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } catch (error) {
        throw error; // Handle any error during JWT token generation
    }
}

const User = mongoose.model("User", userSchema); // Changed model name to singular "User"

module.exports = User;










//
// HodDepartment: {
//     type: String,
//     enum: ["CSE", "ECE", "DS", "IT", "EEE", "MECH", "CIVIL"],
//     default: "CS"
// },
