const mongoose = require("mongoose");
require('dotenv').config();


const dbConnect = async () => {
  try {

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("DB Connection successful");
  } catch (err) {
    console.error("Error in DB Connection =>",err);
    process.exit(1);
  }
};

module.exports = dbConnect;