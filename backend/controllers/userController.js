const User = require("../models/userModel")
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require("../utils/jwtToken");


//Register User
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const{name,email,password} = req.body
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "sample id",
            url:"temp url"
        }
    })

    
    sendToken(user,201,res)
})


//Login User
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

    const {email,password} = req.body

    //Checking if user gave both email and password

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
     
    const isPasswordMatched = user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

   sendToken(user,200,res)
})



//Get all users
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find()

    res.status(201).json({
        success: true,
        users
    })
}
)


//Logout User

exports.logout = catchAsyncErrors(async (req,res,next)=>{
   
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})