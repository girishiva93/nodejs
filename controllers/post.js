// const getPosts = (req,res) => {
//     res.send("Hello World From Node js")
// };

// module.exports = {
//     getPosts
// };

// exports.getPosts = (req,res) => {
//    const posts = Post.find()
//    .then(posts => {
//        res.status(200).json({posts:posts})
//    })
//    .catch(err=>console.log(err));
// };

// module.exports = {
//     getPosts
// };


const Post = require("../models/post");
const formidable  = require('formidable');
const fs = require('fs')

exports.getPosts = (req,res) => {
    const posts = Post.find()
    .populate("postedBy","_id name")
    .select("_id body title") // k k matra aauwjo baneko ho select lay 
    .then(posts => {
        res.json({posts}) // yedi key ra value same xa vane posts matra lakhe hunxa posts : posts garnu pardaina
    })
    .catch(err=>console.log(err));
 };

exports.createPost = (req,res, next) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) =>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(result);
        })
    })
};

exports.postsByUser = (req,res) => { 
    Post.find({postedBy:req.profile._id})
    .populate("postedBy","._id name")
    .sort("_created")
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err,
            })
        }
        res.json({posts})
    });
};

exports.postById = (req,res,next,id) => { 
    post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({
                error:err
            })
        }
        req.post = post
        next()
    });
}

exports.isPoster = (req,res,next) => { 
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if(!isPoster){
        return res.status(403).json({
            error:"User is not authorized"
        })
    }
    next()
}

exports.deletePost = (req,res) => {
    let post = req.post
    post.remove((err,post) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            message:"post deleted"
        })
    })
}