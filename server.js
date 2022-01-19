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


const queries = require('./queries')


const server = new GraphQLServer({typeDefs:queries.typeDefs,resolvers:queries.resolvers})



server.start(({port})=>{
    console.log(`listening on port ${port}`)
})

//app.listen(PORT,()=>{
//    console.log(`listening on port ${PORT}`)
//})