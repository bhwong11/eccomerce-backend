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
const {Product, Review, User, Cart, Category }= require('./models');

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
    product:Product!
    user:User!
}

type Cart{
    _id:ID!
    user:ID!
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
    user:User!
    category:Category!
}

type Query{
    user(id:ID!):User!
    reviews:[Review!]
    review(id:ID!):Review!
    cart(id:ID!):Cart!
    categories:[Category!]
    category(id:ID!):Category!
    products:[Product!]
    product(id:ID!):Product!
}

type Mutation{
    registerUser(username:String!,email:String!, password:String!):User!
    loginUser(username:String!, password:String!):User!
    createReview(title:String!,content:String!,product:ID!,user:ID!):Review!
    updateReview(id:ID!,title:String!,content:String!,product:ID!,user:ID!):Review!
    deleteReview(id:ID!):Review!
    addToCart(id:ID!,product:ID!):Cart!
    removeFromCart(id:ID!,product:ID!):Cart!
    updateCart(id:ID!,products:[ID]):Cart!
    deleteCart(id:ID!):Cart!
    createCategory(title:String!):Category!
    updateCategory(id:ID!,title:String!):Category
    deleteCategory(id:ID!):Category!
    createProduct(title:String!,price:Int!,image:String!,description:String!,user:ID!,category:ID!):Product!
    updateProduct(id:ID!,title:String!,price:Int!,image:String!,description:String!,user:ID!,category:ID!):Product!
    deleteProduct(id:ID!):Product!
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
                const foundUserEmail = await User.findOne({email:email})
                if(foundUserEmail){
                    return {
                        _id:'None',
                        username:'user with that email already exist',
                        email:'user with that email already exist',
                        signup_date:'user with that email already exist',
                        token:'none'
                    }
                }
                const foundUserUsername = await User.findOne({username:username})
                if(foundUserUsername){
                    return {
                        _id:'None',
                        username:'username already exist',
                        email:'username already exist',
                        signup_date:'username already exist',
                        token:'none'
                    }
                }
                
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);
                const user = await User.create({username,email,password:hash})
                const newCart = await Cart.create({user:user.id,products:[]})
                console.log('HIT!!')
                console.log({username:user.username,email:user.email,_id:user._id,signup_date:user.signup_date.toString(),token:'none'})
                return {
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    signup_date:user.signup_date.toString(),
                    token:'none'
                }
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
            
        },
        loginUser:async (parent,{username,password})=>{
            const foundUser = await db.User.findOne({username:username}).select('+password')
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
        },
        createReview: async (parent,{title,content,product,user})=>{
            try{
                const newReview = await Review.create({
                    title,
                    content,
                    product,
                    user,
                })
                return newReview
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        updateReview: async (parent,{id,title,content,product,user})=>{
            try{
                const updatedReview = await Review.findByIdAndUpdate(id,{
                    title,
                    content,
                    product,
                    user,
                },{new:true})
                return updatedReview
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        deleteReview: async (parent,{id})=>{
            try{
                const deletedReview = await Review.findByIdAndDelete(id)
                return deletedReview
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        addToCart:async(parent,{id,product})=>{
            try{
                const updatedCart = await Cart.findByIdAndUpdate(id,{$push:{ products:product}});
                return updatedCart
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        removeFromCart:async(parent,{id,product})=>{
            try{
                const updatedCart = await Cart.findByIdAndUpdate(id,{$pull:{ products:product}});
                return updatedCart
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        updateCart:async(parent,{id,products})=>{
            try{
                const updatedCart = await findByIdAndUpdate(id,{
                    products
                },{new:true})
                return updatedCart
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        deleteCart:async(parent,{id})=>{
            try{
                const deletedCart = await findByIdAndDelete(id)
                return deletedCart
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        createCategory: async(parent,{title})=>{
            try{
                const newCategory = await Category.create(title)
                return newCategory
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        updateCategory: async(parent,{id,title})=>{
            try{
                const updatedCategory = await Category.findByIdAndUpate(id,{
                    title
                },{new:true})
                return updatedCategory
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        deleteCategory: async(parent,{id})=>{
            try{
                const deletedCategory = await Category.findByIdAndDelete(id)
                return deletedCategory
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        createProduct:async(parent,{title,price,image,description,user,category})=>{
            try{
                const newProduct = await Product.create({
                    title,
                    price,
                    image,
                    description,
                    user,
                    category,
                })
                return newProduct
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        updateProduct:async(parent,{id,title,price,image,description,user,category})=>{
            try{
                const updatedProduct = await Product.findByIdAndUpdate(id,{
                    title,
                    price,
                    image,
                    description,
                    user,
                    category,
                },{new:true})
                return updatedProduct
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
        deleteProduct:async(parent,{id})=>{
            try{
                const deletedProduct = await Product.findByIdAndDelete(id)
                return deletedProduct
            }catch(err){
                console.log(err)
                return `error occured ${err}`
            }
        },
    }
}

const queries = require('./queries')

const server = new GraphQLServer({typeDefs:queries.typeDefs,resolvers:queries.resolvers})

server.start(({port})=>{
    console.log(`listening on port ${port}`)
})

//app.listen(PORT,()=>{
//    console.log(`listening on port ${PORT}`)
//})