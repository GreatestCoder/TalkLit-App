const mongoose = require("mongoose");

module.exports.connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
    } catch(error){
        console.log(error);
    }
};