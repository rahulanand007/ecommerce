const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError')


//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})


//Get all Products 
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const product = await Product.find()
    res.status(200).json({
        success:true,
        product
    })
})

//Get single product
exports.getProductDetails = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not Found',404));
    }

    res.status(200).json({
        success:true,
        product
    })
})


//Update Product -- Admin
exports.updateProduct = catchAsyncErrors( async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true, 
        runValidators:true, 
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product delete successfully"
    })
})


