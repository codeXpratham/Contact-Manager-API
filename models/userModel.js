const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: [true ,"Add the user name" ],
    },
    email: {
        type: String,
        required: [true, "Add the contact email"],
        unique: [true, "Email already taken"],
    },
    password: {
        type: String,
        required: [true, "Add the user password"],
    }
}, { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);