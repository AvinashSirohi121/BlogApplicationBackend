const express = require("express");
const router = express.Router();

const {createUser,editUser,getAllUsers,getUser,deleteUser} = require("../controllers/userController");
const {getAllPost, createPost} = require("../controllers/postController")
const {createCategory,getCategory} = require("../controllers/categoryController")
/* User Routes */
router.post("/createUser",createUser);
router.put("/editUser/:id",editUser);
router.get("/getUser/:id",getUser);
router.get("/getAllUser",getAllUsers);
router.delete("/deleteUser/:id",deleteUser);

/* Blog Routes*/
router.get("/getAllPost",getAllPost);
router.post("/createPost",createPost);


router.post("/createCategory",createCategory);
router.get("/getCategory",getCategory);

module.exports = router;