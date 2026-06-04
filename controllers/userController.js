const mongoose = require("mongoose");
const User = require("../models/UserSchema");

const createUser = async(req,res)=>{
    try{
        const {firstName,lastName,email,mobile,password} = req.body;
        console.log("JSON Body =>",req.body)

        if(!firstName || !lastName || !email || !mobile || !password){
            return res.status(400).json({
                success:false,
                message:"Kindly provide all details"
            })
        }
        const existingUserEmail = await userExist({email:email});
        const existingUserMobile = await userExist({mobile:mobile});

        if(!existingUserEmail){
            return res.status(400).json({
                success:false,
                message:"User exist with same email Id"
            })
        }
        if(!existingUserMobile){
            return res.status(400).json({
                success:false,
                message:"User exist with same mobile number"
            })
        }
        const userDetails = await User.create({
            firstName,lastName,email,mobile,password
        })
        console.log("User Created Successfully =>",userDetails);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Unable to create User"
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"User created Successfully",
                data:userDetails
            })
        }

    }catch(error){
        console.error("Error in Create User Method =>",error)
        return res.status(500).json({
            success:false,
            message:"Error in creating User",
            error:error.message
        })
    }
}

const editUser = async(req,res)=>{
    try {
      const id = req.params.id;
      console.log("Id =>",id)
      const {firstName,lastName,email,mobile,password} = req.body;
        console.log("JSON Body =>",req.body)

        if(!firstName || !lastName || !email || !mobile || !password){
            return res.status(400).json({
                success:false,
                message:"Kindly provide all details"
            })
        } 

        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({
                success:false,
                message:"User does not exist"
            })
        }else{
            const updatedUser = await User.findByIdAndUpdate(id,
               {$set:{firstName,lastName,email,mobile,password}},{new:true}
            )
            console.log("Updated User =>",updatedUser);

            if(!updatedUser){
            return res.status(404).json({
                success:false,
                message:"Unable to update User Details"
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"User details updated Successfully",
                data:updatedUser
            })
        }
        }
    } catch (error) {
        console.error("Error in Edit User Method =>",error)
        return res.status(500).json({
            success:false,
            message:"Error in updating User",
            error:error.message
        })
    }
}

const getUser = async(req,res)=>{
    try {
        const {id} = req.params;

        const userDetails = await User.findById({_id:id});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:`Unable to find the User details for UserId : ${id}`
            })
        }else{
            return res.status(200).json({
                success:true,
                message:`User details for UserId : ${id}`,
                data:userDetails
            })
        }
    } catch (error) {
        console.error("Error in get User details Method =>",error)
        return res.status(500).json({
            success:false,
            message:"Error in Get User Details",
            error:error.message
        })
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const allUserDetails = await User.find({});
        if(!allUserDetails){
            return res.status(404).json({
                success:false,
                message:"Unable to find the users"
            })
        }else{
            return res.status(200).json({
                success:false,
                message:"User details presnet",
                data:allUserDetails
            })
        }
    } catch (error) {
        console.error("Error in get All User Details Method =>",error)
        return res.status(500).json({
            success:false,
            message:"Error in Get All User Details Method",
            error:error.message
        })
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({
                success:false,
                message:`Unable to find the User with userId : ${id} to delete`
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"User details deleted successfully"
            })
        }
    } catch (error) {
        console.log("Error in deleting the user details =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in deleting the user details",
            error:error.message
        })
    }
}

const userExist = async ({ id, email, mobile })=>{
    if (id) {
        return await User.findById(id);
    }

    if (email) {
        return await User.findOne(email);
    }
    if (mobile) {
        return await User.findOne(mobile);
    }

    return null;
}

module.exports ={userExist,deleteUser,getAllUsers,getUser,editUser,createUser}