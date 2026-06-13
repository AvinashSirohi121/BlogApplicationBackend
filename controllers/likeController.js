const mongoose = require("mongoose");
const Like = require("../models/LikeSchema");
const Post = require("../models/PostSchema")
const User = require("../models/UserSchema")

const toggleLikesOnPost = async(req,res)=>{
    try{
        
        const {userId,postId} = req.body;

        const postExist = await Post.findById(postId);
        console.log("postExist =>",postExist)
        if(!postExist){
            return res.status(404).json({
                success:false,
                message:"Post does not exist"
            })
        }
        const userExists = await User.findById(userId);
        if(!userExists){
            return res.status(404).json({
                success:false,
                message:"User does not exist"
            })
        }

        const likeExist = await Like.findOne({
            user:userId,
            post:postId
        })
        

        if(likeExist){
            await Like.findByIdAndDelete(likeExist._id);
            await Post.findByIdAndUpdate(postId,
                {$pull:{likes:likeExist._id}}                                   
            )
            return res.status(200).json({
                success:true,                                                                                                                                
                message:"Post disliked successfully"
            })
        }else{
            let likeData = await Like.create({
                user:userId,
                post:postId
            })
            await Post.findByIdAndUpdate(postId,
                {$push:{likes:likeData._id}}
            )

            return res.status(200).json({
                success:true,
                message:"Post Liked successfullhy"
            })
        }


    }catch(error){
        console.log("Error while toggle the Post =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in toggle the posts Likes",
            error:error.message
        })
    }
}

module.exports = {toggleLikesOnPost}