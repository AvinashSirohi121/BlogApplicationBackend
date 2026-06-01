const mongoose = require("mongoose");
const User = require("../models/UserSchema");

exports.createUser = async(req,res)=>{
    try{
        const {firstName,lastName,email,mobile,password} = req.body;
        console.log("JSON Body =>",req.body)

        if(!firstName || !lastName || !email || !mobile || !password){
            return res.status(400).json({
                success:false,
                message:"Kindly provide all details"
            })
        }
        const existingUserEmail = await User.findOne({email});
        const existingUserMobile = await User.findOne({mobile});

        if(existingUserEmail){
            return res.status(400).json({
                success:false,
                message:"User exist with same email Id"
            })
        }
        if(existingUserMobile){
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

exports.editUser = async(req,res)=>{
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