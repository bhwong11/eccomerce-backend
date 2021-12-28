const {Product, Review, User, Cart, Category }= require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
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