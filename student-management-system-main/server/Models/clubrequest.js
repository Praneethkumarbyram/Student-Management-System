const mongoose = require('mongoose');

const joinclubSchema = new mongoose.Schema({
    clubName:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    userDepartment:{
        type: String,
        required: true
    },
    userSkills:{
        type: Array,
        required: true,
        default: []
    },
    status: {
        type: String,
        enum: ["Approved", "Denied", "Pending"],
        default: "Pending",
      },
    }
)

const clubrequest = mongoose.model('Joinclub', joinclubSchema);

module.exports = { clubrequest };
