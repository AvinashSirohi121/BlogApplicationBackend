const mongoose = require("mongoose");
const Comment = require("../models/CommentSchema");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");


const createComment = async(req,res)=>{
    try {
        const {comment,userId,postId} = req.body;
        if(!comment || !userId || !postId){
            return res.status(404).json({
                success:false,
                message:"Kindly provide all details"
            })
        }

        const validUser = await User.findById(userId);
        if(!validUser){
             return res.status(404).json({
                success:false,
                message:"User not found"
            })
        } 

        const validPost  = await Post.findById(postId);
        if(!validPost){
             return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        } 

        const commentData = await Comment.create({
            "comment":comment,
            "user":userId,
            "post":postId
        })

        const updatedPost = await Post.findByIdAndUpdate(postId,
                                {$push:{comments:commentData?._id}},
                                {returnDocument:"after"})
                                .populate("author","firstName lastName")
                                .populate("comments","comment")
                                .lean();
        console.log("UpdatedPost =>",typeof updatedPost , updatedPost)                        

        const postWithStats = {
            ...updatedPost,
            likesCount : updatedPost?.likes?.length || 0,
            commentsCount : updatedPost?.comments?.length || 0
        }                      

         return res.status(201).json({
            success:true,
            message:"Comment created successfully",
            data:postWithStats
         })                       


    } catch (error) {
        console.log("Error in create comment =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in create comment",
            error:error.message
        })
    }
}

const editComment = async(req,res)=>{
    try{
        const commentId = req.params.id;
        const {comment,userId,postId} = req.body;
        console.log(commentId,comment,userId,postId)

        if(!comment || !userId || !postId || !commentId){
            return res.status(400).json({
                success:false,
                message:"Kindly provide all the details"
            })
        }
        const validUser = await User.findById(userId);
        if(!validUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
         const validPost  = await Post.findById(postId);
        if(!validPost){
             return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
         const validComment  = await Comment.findById(commentId);
        if(!validComment){
             return res.status(404).json({
                success:false,
                message:"Comment not found"
            })
        }

        const editedComment = await Comment.findByIdAndUpdate(
                    commentId,
                    { comment },
                    { returnDocument: "after" }
            );

         return res.status(200).json({
            success:true,
            message:"Comment edited successfully"
         })   

    }catch(error){
        console.log("Error in edit comment =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in edit comment",
            error:error.message
        })
    }
}

const deleteComment = async(req,res)=>{
    try{
        const commentId = req.params.id;
        const {postId} = req.body;

        const validComment = await Comment.findById(commentId);
        if(!validComment){
            
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            })
        }
        

        const validPost = await Post.findById(postId);
        if(!validPost){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(postId,
            {$pull:{comments:commentId}},{returnDocument:"after"}
        )

        const deleteComment = await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({
            success:true,
            message:"Comment deleted successfully",
            data:updatedPost
        })

    }catch(error){
        console.log("Error in delete comment =>",error)
        return res.status(500).json({
            success:false,
            message:"Error in deleting comment",
            error:error.message
        })
    }
}

const getAllCommentsForPost = async(req,res)=>{
    try{
        const postId = req.params.id;

         const validPost = await Post.findById(postId);
        if(!validPost){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }

        const postDetails = await Post.findById(postId).populate({
            path:"comments",
            select:"comment user",
            populate:{
                path:"user",
                select:"firstName lastName"
            }
        })
            
        const commentData =[...postDetails.comments];

        console.log("COmmentData =>",commentData);

        return res.status(200).json({
            success:true,
            message:"Comments fetched successfully",
            data:commentData
        })
        

    }catch(error){
        console.log("Error in getAllCommentsForPost =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in getting all comment for the post",
            error:error.message
        })
    }
}

const getAllCommentsForUser = async(req,res)=>{
    try{
        const userId = req.params.id;

        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Kindly provide User Id"
            })
        }
        const validUser = await User.findById(userId);
        if(!validUser){
            return res.status(404).json({
                success:false,
                message:"User Details not found"
            })
        }

        const commentsDetails = await Comment.find({user:userId})
                                    .populate("post","title").lean();

        return res.status(200).json({
            success:true,
            message:`Comments fetched successfully for UserId : ${userId}`,
            data:commentsDetails
        })                            

    }catch(error){
        console.log("Error in getting all comments for User =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching all comments for the user",
            error:error.message
        })
    }
}
module.exports = { createComment,editComment,deleteComment,getAllCommentsForPost, getAllCommentsForUser}