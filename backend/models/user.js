const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;