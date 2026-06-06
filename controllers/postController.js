const mongoose = require("mongoose");
const Post = require("../models/PostSchema");
const Comment = require("../models/CommentSchema")
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
                            .populate("category","name")
                            .populate("comments","comment")
                            .lean();

            
        const postWithStats = postDetails?.map((post)=>({
            ...post,
            likesCount: post?.likes?.length || 0,
            commentsCount : post?.comments?.length || 0
        }))                    
        if(!postWithStats){
            return res.status(404).json({
                success:false,
                message:"Post details not present"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Post details found successfully",
                data:postWithStats
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

const getPost = async(req,res)=>{
    try{

        const {id} = req.params;
        const postData = await Post.findById(id)
                                    .populate("author","firstName lastName")
                                    .populate("category","name")
                                    .populate("comments","comment")
                                    .lean();

         const postWithStats = postData?.map((post)=>({
            ...post,
            likesCount: post?.likes?.length || 0,
            commentsCount : post?.comments?.length || 0
        }))                    
        if(!postWithStats){
            return res.status(404).json({
                success:false,
                message:"Post details not present"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Post details found successfully",
                data:postWithStats
            })
        }

        return res.status(200).json({
            success:true,
            message:"Post data fetched successfully",
            data:postData
        })
    }catch(error){
        console.log("Error in getting Post data =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching the Post Data",
            error:error.message
        })
    }
}

const editPost = async(req,res)=>{
    try{
        const {id} = req.params;
        let {title,description,tags,category} =req.body;

        if(!title || !description || !tags || !category){
            return res.status(400).json({
                success:false,
                message:"Kindly provide all the details"
            }) 
        }

        const editedPost = await Post.findByIdAndUpdate(id,
            { $set:{"title":title,"descripton":description,"tags":tags,"category":category}},{returnDocument:"after"}
        )

        return res.status(201).json({
            success:false,
            message:"Post Edited Successfully",
            data:editedPost
        })


    }catch(error){
        console.log("Error in editing the Post =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in editing the Post",
            error:error.message
        })
    }
}

const deletePost = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletedData = await Post.findByIdAndDelete(id);

         if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: "Post does not exist"
            });
        }

        return res.status(200).json({
            success:true,
            message:'Post deleted successfully'
        })
        
    } catch (error) {
        console.log("Error in deleting the Post =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in deleting the Post",
            error:error.message
        })
    }
}

module.exports = {createPost,getAllPost,getPost,editPost,deletePost}