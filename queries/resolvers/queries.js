const {Product, Review, User, Cart, Category }= require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

module.exports = {
    user:async (parent,{id})=>{
        try{
            const user = await User.findById(id);
            return {
                _id:user._id,
                username:user.username,
                email:user.email,
                cart:user.cart,
                admin:'none',
                signup_date:user.signup_date.toDateString(),
                token:'none'
            }
        }catch(err){
            console.log(err)
            return {
                _id:'none',
                username:err.toString(),
                email:err.toString(),
                cart:'none',
                admin:'none',
                signup_date:'none',
                token:'none'
            }
        }
    },
    reviews:async ()=>{
        try{
            const reviews = await Review.find({}).populate('user').populate('product')
            return reviews;
        }catch(err){
            console.log(err)
            return err
        }
    },
    reviewsProductSearch:async (parent,{id})=>{
        try{
            const reviews = await Review.find({product:id}).populate('user').populate('product')
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
    productsCategorySearch:async (parent,{id})=>{
        try{
            const products = await Product.find({category:id}).populate('user').populate('category')
            return products
        }catch(err){
            console.log(err)
            return err
        }

    },
    product:async (parent,{id})=>{
        try{
            console.log('asfdasdfasdf')
            const product = await Product.findById(id).populate('category').populate('user')
            console.log('PROUDCT',product)
            return product
        }catch(err){
            console.log(err)
            return err
        }
    }
    ,
    stripeKey:async (parent,{amount})=>{
        console.log('AMOUNT',amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'usd',
            payment_method_types: ['card'],
          });
          console.log('payment',paymentIntent)
        return paymentIntent.client_secret
    }
}