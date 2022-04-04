const express = require('express')
const {signup, signin,signout } = require('../controllers/auth')

const {userSignupValidator } = require('../validator')

const router = express.Router()

const {userById} = require("../controllers/user");

router.post('/signup',userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
// amy route containing: user id, our app will first execute userById()
router.param("userId", userById);

module.exports = router