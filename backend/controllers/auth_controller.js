const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../lib/utils.js");
const {cloudinary} = require("../lib/cloudinary.js");


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
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.login = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ Email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" }); // never tell the client which one is incorrect: password or email
    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);
    res.status(200).json({_id: user._id, fullName: user.fullName, Email: user.Email, profilePic: user.profilePic,});
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};