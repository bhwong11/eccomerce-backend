const {Product, Review, User, Cart, Category }= require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    registerUser:async (parent,{username,email,password})=>{
        try{
            const foundUserEmail = await User.findOne({email:email})
            if(foundUserEmail){
                return {
                    _id:'none',
                    username:'user with that email already exist',
                    email:'user with that email already exist',
                    cart:'none',
                    admin:false,
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
                    cart:'none',
                    admin:false,
                    signup_date:'username already exist',
                    token:'none'
                }
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);
            const user = await User.create({username,email,password:hash})
            const newCart = await Cart.create({user:user._id,products:[]})
            await User.findByIdAndUpdate(user._id,{cart:newCart._id},{new:true})
            console.log('Register worked',user)
            return {
                _id:user._id,
                username:user.username,
                email:user.email,
                cart:newCart._id,
                admin:user.admin,
                signup_date:user.signup_date.toDateString(),
                token:'none'
            }
        }catch(err){
            console.log(err)
            return {
                _id:'None',
                username:err.toString(),
                email:err.toString(),
                cart:newCart._id,
                admin:false,
                signup_date:'none',
                token:'none'
            }
        }
        
    },
    loginUser:async (parent,{username,password})=>{
        try{
        console.log('HIT LOGIN USER')
        const foundUser = await User.findOne({username:username}).select('+password')
        if(!foundUser){
            return {
                _id:'none',
                username:'user was not found',
                email:'user was not found',
                cart:'none',
                admin:false,
                signup_date:'user was not found',
                token:'none'
            }
        }

        const isMatch = bcrypt.compare(foundUser.password,password)
        if(isMatch){
            const token = jwt.sign({_id:foundUser._id},'supersecretwaffles',{
                expiresIn:'1d',
            })
            console.log('found User',foundUser)
            return {
                _id:foundUser._id,
                username:foundUser.username,
                email:foundUser.email,
                cart:foundUser.cart,
                admin:foundUser.admin,
                signup_date:foundUser.signup_date.toDateString(),
                token,
            }
        }else{
            return {
                _id:'None',
                username:'password is incorrect',
                email:'password is incorrect',
                cart:'none',
                admin:false,
                signup_date:'password is incorrect',
                token:'none'
            }
        }
        }catch(err){
            return {
                _id:'None',
                username:err.toString(),
                email:err.toString(),
                cart:'none',
                admin:false,
                signup_date:err.toString(),
                token:'none'
            }
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
            const updatedCart = await Cart.findByIdAndUpdate(id,{$push:{ products:product}},{new:true});
            console.log(updatedCart)
            return updatedCart
        }catch(err){
            console.log(err)
            return `error occured ${err}`
        }
    },
    removeFromCart:async(parent,{id,product})=>{
        try{
            const cart = await Cart.findById(id)
            let productsCopy = cart.products
            let index = productsCopy.indexOf(product)
            productsCopy.splice(index,1)
            const updatedCart = await Cart.findByIdAndUpdate(id,{ products:productsCopy},{new:true});
            console.log(updatedCart)
            return updatedCart
        }catch(err){
            console.log(err)
            return `error occured ${err}`
        }
    },
    updateCart:async(parent,{id,products})=>{
        try{
            const updatedCart = await Cart.findByIdAndUpdate(id,{
                products
            },{new:true})
            console.log(updatedCart)
            return updatedCart
        }catch(err){
            console.log(err)
            return `error occured ${err}`
        }
    },
    clearCart:async(parent,{id})=>{
        try{
            const updatedCart = await Cart.findByIdAndUpdate(id,{
                products:[]
            },{new:true})
            console.log(updatedCart)
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
    createCategory: async(parent,{name})=>{
        try{
            const newCategory = await Category.create({name:name})
            console.log(newCategory)
            return newCategory
        }catch(err){
            console.log(err)
            return {
                _id:'none',
                name:err.toString(),
            }
        }
    },
    updateCategory: async(parent,{id,name})=>{
        try{
            const updatedCategory = await Category.findByIdAndUpdate(id,{
                name:name
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
            console.log('CATEGORY',category)
            const newProduct = await Product.create({
                title,
                price,
                image,
                description,
                user,
                category,
            })
            console.log(newProduct)
            return newProduct
        }catch(err){
            console.log(err)
            return {
                _id:'none',
                title:err.toString(),
                price:0,
                image:'error',
                description:'error',
                user:'none',
                category:'none',
            }
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
            return {
                _id:'none',
                title:err.toString(),
                price:0,
                image:'error',
                description:'error',
                user:'none',
                category:'none',
            }
        }
    },
    deleteProduct:async(parent,{id})=>{
        try{
            const deletedProduct = await Product.findByIdAndDelete(id)
            return deletedProduct
        }catch(err){
            console.log(err)
            return {
                _id:'none',
                title:err.toString(),
                price:0,
                image:'error',
                description:'error',
                user:'none',
                category:'none',
            }
        }
    },
}