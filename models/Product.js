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
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product;