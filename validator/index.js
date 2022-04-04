exports.createPostValidator = (req,res,next) =>{
    // title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "title must be between 4 to 150 characters").isLength({
        min:4,
        max:150
    });
    // body
    req.check("body", "Write a body").notEmpty();
    req.check("body", "body must be between 4 to 2000 characters").isLength({
        min:4,
        max:2000
    });
    // check for errors
    const errors = req.validationErrors();
    // if errors shows the first one as they happen 
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];

        return res.status(400).json({error:firstError});
    }
// process to next middleware
    next();
};

exports.userSignupValidator = (req,res,next) =>{
    // Name
    req.check("name", "Name Can not be Empty").notEmpty();
    // Email
    req.check("email", "email must be between 3 to 32 characters").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must Contain @")
    .isLength({
        min:4,
        max:200
    });
    // Check for Password 
    req.check("password", "Password is Required").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must Contain at least 6 number")
    .matches(/\d/)
    .withMessage("Password must Contain a number")

    // check for errors
    const errors = req.validationErrors();
    // if errors shows the first one as they happen 
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];

        return res.status(400).json({error:firstError});
    }
// process to next middleware
    next();
};