const express = require('express')
const {requireSignin } = require('../controllers/auth')
const {getPosts, createPost, postsByUser,postById,isPoster,deletePost } = require('../controllers/post')
const {createPostValidator} = require('../validator')

const {userById} = require("../controllers/user");

const router = express.Router()

router.get('/', getPosts)
router.post("/post/new/:userId",requireSignin,createPostValidator,createPost);  // yes ma first ma valid garxa ani postcontroller ma pathau xa
router.get("/posts/by/:userId", requireSignin, postsByUser)
router.delete("/post/postId", requireSignin,isPoster, deletePost)
// amy route containing: user id, our app will first execute userById()
router.param("userId", userById);
// amy route containing: post by id, our app will first execute postById()
router.param("postId", postById);



module.exports = router