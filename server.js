const express = require('express');
const {GraphQLServer} = require('graphql-yoga');
const cors = require('cors');
const {GraphQLDate} = require('graphql-iso-date');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

//models
const {Product, Review, User }= require('./models');

app.get('/hello',(req,res)=>{
    return res.send('HELLO!')
})

const typeDefs = `
type User{
    _id:ID!
    username:String!
    email:String!
    signup_date:String!
    token:String!
}

type Review{
    _id:ID!
    title:String!
    content:String!
    product:Product
    user:User
}

type Cart{
    _id:ID!
    user:User!
    products:[Product!]
}

type Category{
    _id:ID!
    name:String!
    products:[Product!]
}

type Product{
    _id:ID!
    title:String!
    price:Int!
    image:String!
    description:String!
    cart:Cart!
    user:User!
    category:Category!
}

type Query{
    user(id:ID!):User!
    reviews:[Review!]
    review(id:ID!):Review!
    cart(id:ID!):Cart!
    categories:[Category!]
    category(id:ID!):Category
    products:[Product!]
    product(id:ID!):Product!
}

type Mutation{
    registerUser(username:String!,email:String!, password:String!):String!
    loginUser(username:String!, password:String!):String!
    createReview(title:String!,content:String!,product:ID!,user:ID!):Review!
    updateReview(id:ID!,title:String!,content:String!,product:ID!,user:ID!):Review!
    deleteReview(id:ID!):Review!
    createCart(user:ID!):Cart!
    updateCart(id:ID!,products:[ID]):Cart!
    deleteCart(id:ID!):Cart!
    categories:[Category!]
    category(id:ID!):Category
    products:[Product!]
    product(id:ID!):Product!
}
`;

const resolvers ={
    Query:{
        user:async (parent,{id})=>{
            try{
                const user = User.findById(id);
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
    },
    Mutation:{
        registerUser:async (parent,{username,email,password})=>{
            try{
                const foundUserEmail = User.findOne({email:email})
                if(foundUserEmail){
                    return `User with this email already exist`
                }
                const foundUserUsername = User.findOne({username:username})
                if(foundUserUsername){
                    return `User with this username already exist`
                }
                if(foundUserEmail){
                    return `User with this email already exist`
                }

                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);
                const user = User.create({username,email,password:hash})
                return `register user success`
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
            
        },
        loginUser:async (parent,{username,password})=>{
            const foundUser = await db.User.findOne({username:req.body.username}).select('+password')
            if(!foundUser){
                return `inccorrect username or password`
            }

            const isMatch = bcrypt.compare(foundUser.password,password)

            if(isMatch){
                const token = jwt.sign({_id:createdUser._id},'supersecretwaffles',{
                    expiresIn:'1d',
                })
                return {...foundUser,token}
            }else{
                return `password is not correct`
            }
        }
    }
}

const server = new GraphQLServer({typeDefs,resolvers})

server.start(({port})=>{
    console.log(`listening on port ${port}`)
})

//app.listen(PORT,()=>{
//    console.log(`listening on port ${PORT}`)
//})