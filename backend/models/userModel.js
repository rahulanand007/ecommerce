const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Characters"],
        minlength:[4,"Name Should Have more than 4 Characters"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Your Password"],
        minlength:[6,"Password Should be Greater than 6 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    // createdAt:Date.now(),
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{ timestamps: true })

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTTOken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    let isMatch= await bcrypt.compare(enteredPassword, this.password);
     return  isMatch        
}


//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function (){
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}




module.exports = mongoose.model("User",userSchema)