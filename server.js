const express = require('express');
const {GraphQLServer} = require('graphql-yoga');
const cors = require('cors');
const {GraphQLDate} = require('graphql-iso-date');

const app = express();

const PORT = process.env.PORT || 4000;

//models
const {Product}= require('./models');

app.get('/hello',(req,res)=>{
    return res.send('HELLO!')
})

const typeDefs = `
type User{
    _id:ID!
    username:String!
    email:String!
    signup_date:String!
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
    products:[Product!]
}
`;

const resolvers ={
    Query:{
        products:async ()=>Product.find({})
    }
}

const server = new GraphQLServer({typeDefs,resolvers})

server.start(({port})=>{
    console.log(`listening on port ${port}`)
})

//app.listen(PORT,()=>{
//    console.log(`listening on port ${PORT}`)
//})