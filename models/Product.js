const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:"product title",
    },
    price:{
        type:Number,
        required:true,
        default:1,
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        default:"product description",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },

})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product;