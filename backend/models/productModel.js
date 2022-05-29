const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please enter product description"]
    },
    price:{
        type:Number,
        required: [true,"Please emter product price"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxlength:[4,"Stock cannot exeed 4 charcters"],
        default: 1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema)