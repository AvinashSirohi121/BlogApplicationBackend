const mongoose = require("mongoose");
const Post = require("../models/PostSchema");
const { categoryExist } = require("./categoryController");
const { userExist } = require("./userController");


const createPost = async(req,res)=>{
    try {
        const {title,content,tags,author,category} = req.body;
        if(!title || !content || !tags || !author || !category){
            return res.status(400).json({
                success:false,
                messsage:"Kindly provide all the details"
            })
        }

        let categoryExists = await categoryExist({id:category});
        if(!categoryExists){
            return res.status(400).json({
                success:false,
                message:"Category does not exist"
            })
        }

        let authorExists = await userExist({id:author});
        if(!authorExists){
            return res.status(400).json({
                success:false,
                message:"Author does not exist"
            })
        }

        const postDetails = await Post.create({title,content,tags,author,category});
        console.log("postDetails =>",postDetails);

        if(!postDetails){
            return res.status(404).json({
                success:false,
                message:"Unable to create Post Details"
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"Post created successfully",
                data:postDetails
            })

        }
        
    } catch (error) {
        console.log("Error in creating post Method =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in creating post method",
            error:error.message
        })
    }
}

const getAllPost = async(req,res)=>{
    try {
        const postDetails = await Post.find({})
                            .populate("author","firstName lastName")
                            .populate("category","name");
        if(!postDetails){
            return res.status(404).json({
                success:false,
                message:"Post details not present"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Post details found successfully",
                data:postDetails
            })
        }
    } catch (error) {
        console.log("Error in getAllPost Method =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in getting all post details",
            error:error.message
        })
    }
}


module.exports = {createPost,getAllPost}