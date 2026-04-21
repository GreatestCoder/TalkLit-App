const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../lib/utils.js");

module.exports.signup = async (req,res) => {
    const {fullName, Email, Password} = req.body;
    try {
        if (!fullName || !Email || !Password) {
            return res.status(400).json({message: "All fields are required!"});
        }
        if (Password.length < 6) {
            return res.status(400).json({message: "Your password must be at least 6 characters long!"});
        }
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(Email)) {
            return res.status(400).json({message: "Invalid Email format!"});
        }

        const user = await User.findOne({ Email:Email });
        if (user) return res.status(400).json({ message: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = new User({fullName, Email, Password: hashedPassword,});
        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            res.status(201).json({_id: newUser._id, fullName: newUser.fullName, Email: newUser.Email, profilePic: newUser.profilePic,});
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.login = (req,res) => {
    res.send("Login Page!");
};

module.exports.logout = (req,res) => {
    res.send("Logout Page!");
};