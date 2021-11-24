const mongoose = require('mongoose');
require('dotenv').config();

//const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce'

const connectionString = process.env.MONGO_URI

const configOptions ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}

mongoose.connect(connectionString,configOptions)
.then(
    ()=>{
        return console.log(`MongoDB Connected...`)
    }
).catch(
    (err)=>{
        return console.log(`MongoDB Connection error: ${err}`)
    }
)

module.exports={
    User:require('./User'),
    Review:require('./Review'),
    Product:require('./Product'),
    Category:require('./Category'),
    Cart:require('./Cart'),
}

