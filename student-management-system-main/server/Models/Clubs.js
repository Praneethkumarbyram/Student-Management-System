const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: true
    },
    clubDescription: {
        type: String,
        required: true
    },
    president: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        }
    },
    vicePresident: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        }
    },
    advisor: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        }
    },
    members: [{
        name: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        }
    }],
    events: [{
        eventName: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
});

const Clubs = mongoose.model('Club', clubSchema);

module.exports = Clubs;
