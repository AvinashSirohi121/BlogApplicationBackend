const  mongoose = require("mongoose");

const postSchema = new  mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:200
    },
    content:{
        type:String,
        required:true
    },
    tags:[
        {
            type:String,
            required:true
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{timestamp:true});


module.exports = mongoose.model("Post",postSchema);