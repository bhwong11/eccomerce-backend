const {Product, Review, User, Cart, Category }= require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    user:async (parent,{id})=>{
        try{
            const user = await User.findById(id);
            return {user,token:''}
        }catch(err){
            console.log(err)
            return err
        }
    },
    reviews:async ()=>{
        try{
            const reviews = Review.find({})
            return reviews;
        }catch(err){
            console.log(err)
            return err
        }
    },
    review:async (parent,{id})=>{
        try{
            const review = await Review.findById(id)
            return review
        }catch(err){
            console.log(err)
            return err
        }
    },
    cart:async (parent,{id})=>{
        try{
            const cart = await Cart.findById(id)
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
            const Category = await Category.findById(id)
            return Category
        }catch(err){
            console.log(err)
            return err
        }
    },
    products:async ()=>{
        try{
            const products = await Product.find({})
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