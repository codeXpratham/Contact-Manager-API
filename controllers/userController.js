
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const e = require('express');

// @desc Register a user
// @routes POST /api/users/register
// @access public 
const registerUser = asyncHandler(async (req, res)=> {

    const {username  , email, password} = req.body;
    if(!username || !email || !password){
        // res.status(404).json({messege: "body is not valid"});
        res.status(400);
        throw new Error("All fields are required");
    }
    
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("Email already registered");
    }
    
    const hashPassword = await bcrypt.hash(password , 10);
    console.log("hashed password" + hashPassword);
    
    const user = await User.create({
        username,
        email,
        password : hashPassword,
    });
    
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id : user.id , email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }

    res.json({messege : "register the user"});
 }); 

// @desc Login user
// @routes POST /api/users/login
// @access public 
const loginUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(404);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email });
    //compare password with hased password
    if(user && (await bcrypt.compare(password , user.password)) ){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id, 
            }
        }, process.env.ACCESS_TOKEN,
           {expiresIn : "15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({messege : "login user"});
    // res.json({messege : "login user"});
 }); 

// @desc Current user info
// @routes POST /api/users/current
// @access private 
const currentUser = asyncHandler(async (req, res)=> {
    res.json(req.user);
    res.json({messege : "current user information"});
 }); 

 module.exports = {registerUser , loginUser, currentUser};