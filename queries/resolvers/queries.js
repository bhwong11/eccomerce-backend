const {Product, Review, User, Cart, Category }= require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    user:async (parent,{id})=>{
        try{
            const user = await User.findById(id);
            return {
                _id:user._id,
                username:user.username,
                email:user.email,
                signup_date:user.signup_date.toDateString(),
                token:'none'
            }
        }catch(err){
            console.log(err)
            return {
                _id:'none',
                username:err.toString(),
                email:err.toString(),
                signup_date:'none',
                token:'none'
            }
        }
    },
    reviews:async ()=>{
        try{
            const reviews = Review.find({}).populate('user').populate('product')
            return reviews;
        }catch(err){
            console.log(err)
            return err
        }
    },
    review:async (parent,{id})=>{
        try{
            const review = await Review.findById(id).populate('user').populate('product')
            return review
        }catch(err){
            console.log(err)
            return err
        }
    },
    cart:async (parent,{id})=>{
        try{
            const cart = await Cart.findById(id).populate('user').populate('products')
            return cart
        }catch(err){
            console.log(err)
            return err
        }
    },
    categories:async ()=>{
        try{
            const categories = await Category.find({})
            return categories
        }catch(err){
            console.log(err)
            return err
        }

    },
    category:async (parent,{id})=>{
        try{
            const category = await Category.findById(id)
            return category
        }catch(err){
            console.log(err)
            return err
        }
    },
    products:async ()=>{
        try{
            const products = await Product.find({}).populate('user').populate('category')
            return products
        }catch(err){
            console.log(err)
            return err
        }

    },
    product:async (parent,{id})=>{
        try{
            console.log('asfdasdfasdf')
            const product = await Product.findById(id)
            console.log('PROUDCT',product)
            return product
        }catch(err){
            console.log(err)
            return err
        }
    }
    ,
}