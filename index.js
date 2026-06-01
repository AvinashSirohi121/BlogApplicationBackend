const express = require("express");
const app = express();


// Adding middleware 
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 5000;


// Db connection
const dbConnect = require("./database/database.js");
dbConnect();

app.listen(PORT,()=>{
    console.log(`App is running on PORT : ${PORT}`)
})