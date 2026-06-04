const mongoose = require("mongoose");
const Category = require("../models/CategorySchema");


const createCategory = async(req,res)=>{
    try{
        let {name,description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Kindly provide both Name and Description details"
            })
        }
        name = name.trim().toLowerCase();
        description = description.trim().toLowerCase();

        const existingCategroy = categoryExist({name});
        if(existingCategroy){
            return res.status(409).json({
                success:false,
                message: `Category : ${name.toUpperCase()} already exist`
            })
        }

        const categoryData = await Category.create({name,description});
        
             return res.status(201).json({
                success:false,
                message:"Category created succcessfully",
                data:categoryData
            })
        

    }catch(error){
        console.log("Error in creating category =>",error);
        return res.status(500).json({
            success:false,
            message:"Error in creating category",
            error:error.message
        })
    }
}

const getCategory = async(req,res)=>{
    try {
        const categoryData = await Category.find({});
        if(!categoryData){
             return res.status(400).json({
                success:false,
                message:"Unable to find category details"
            })
        }else{
             return res.status(201).json({
                success:false,
                message:"Category details fetched succcessfully",
                data:categoryData
            })
        }
        
    } catch (error) {
         console.log("Error in getting category  details=>",error);
        return res.status(500).json({
            success:false,
            message:"Error in getting category details",
            error:error.message
        })  
    }
}

const categoryExist = async ({ name, id }) => {

    if (name) {
        return await Category.findOne({
            name: name.trim().toLowerCase()
        });
    }

    if (id) {
        return await Category.findById(id);
    }

    return null;
};


module.exports = {categoryExist,createCategory,getCategory};