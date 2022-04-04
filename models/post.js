const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:"title is required",
        minlength:4,
        maxlength:150,
    },
    body:{
        type:String,
        require:"body is required",
        minlength:4,
        maxlength:2000,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User",
    },
    created:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model("post", postSchema); // post baneko tei module name ho