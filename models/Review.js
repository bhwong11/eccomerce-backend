const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'product title',
    },
    content:{
        type:String,
        default:'product title',
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})

const Review = mongoose.model('Review',ReviewSchema);

module.exports = Review;