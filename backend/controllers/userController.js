const User = require("../models/userModel")
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")


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

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }

    //Get reset Password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl =  `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is : - \n\n ${resetPasswordUrl} \n\n If you did not requested this, please ignore`

    try {
        
        await sendEmail({
            email: user.email,
            subject : "Ecommerce Password Recovery",
            message,
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully` 
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))
        
    }
})

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})


//Update Password
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    
    const isPasswordMatched = user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesn't match", ))
    }

    user.password = req.body.newPassword

    await user.save();

    sendToken(user,200,res)


})

//update user profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
   

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    //Will add avatar later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    })


    res.status(200).json({
        success:true,
        user
    })


})

