const express = require("express");
const router = express.Router();

const {createUser,editUser,getAllUsers,getUser,deleteUser} = require("../controllers/userController");
const {getAllPost, createPost,getPost,deletePost,editPost} = require("../controllers/postController");
const {createCategory,getCategory} = require("../controllers/categoryController");
const {toggleLikesOnPost} = require("../controllers/likeController");
const { createComment,editComment,deleteComment,getAllCommentsForPost,getAllCommentsForUser} = require("../controllers/commentController");

/* User Routes */
router.post("/createUser",createUser);
router.put("/editUser/:id",editUser);
router.get("/getUser/:id",getUser);
router.get("/getAllUser",getAllUsers);
router.delete("/deleteUser/:id",deleteUser);

/* Blog Routes*/
router.get("/getAllPost",getAllPost);
router.post("/createPost",createPost);
router.get("/getPost/:id",getPost);
router.put("/editPost/:id",editPost);
router.delete("/deletePost/:id",deletePost);


/*Category Routes*/
router.post("/createCategory",createCategory);
router.get("/getCategory",getCategory);

/*Like Routes */
router.put("/toggleLikesOnPost",toggleLikesOnPost)

/*Comment Routes*/
router.post("/createComment", createComment)
router.put("/editComment/:id", editComment)
router.delete("/deleteComment/:id", deleteComment)
router.get("/getAllCommentsForPost/:id",getAllCommentsForPost)
router.get("/getAllCommentsForUser/:id",getAllCommentsForUser)

module.exports = router;