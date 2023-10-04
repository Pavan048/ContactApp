const asyncHandler = require("express-async-handler");
const dotenv = require('dotenv');
dotenv.config(); 
const bcrypt = require("bcrypt");
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

// @desc ....create a user
// @route .....post /api/user/register
// @access ......Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already existed");
    }
    // create a hashpassword
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed password",hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`user created sucessfully ${user}`);
    if(user){
        res.status(201).json({_id: user.id , email:user.email})
    }else{
        res.status(400);
        throw new Error("user data is invalid");
    }
  });


// @desc ....login a user
// @route .....post /api/user/login
// @access ......Public
const loginUser = asyncHandler(async (req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // fetch the user based on email to compare
    const user = await User.findOne({email});
    // comparing the crendentials 
    if(user && (await bcrypt.compare(password , user.password))) {
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET , {expiresIn: "20m"} );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password are not matched");

    }
    
  });

// @desc ....current user
// @route .....get /api/user/current
// @access ......Private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


  module.exports = {registerUser , loginUser , currentUser};