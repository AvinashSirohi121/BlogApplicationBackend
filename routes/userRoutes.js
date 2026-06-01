const express = require("express");
const router = express.Router();

const {createUser,editUser} = require("../controllers/userController");

router.post("/createUser",createUser);
router.put("/editUser/:id",editUser);

module.exports = router;