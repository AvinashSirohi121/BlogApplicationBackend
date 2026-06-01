const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    bio:String,
    descripion:String,
    gender:String,
    website:String,
    avatar:String,

})

module.exports = mongoose.model("Profile",profileSchema);