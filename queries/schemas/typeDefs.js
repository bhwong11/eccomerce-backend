module.exports = `
scalar Upload

type User{
    _id:ID!
    username:String!
    email:String!
    signup_date:String!
    cart:ID!
    admin:Boolean!
    token:String!
}

type Review{
    _id:ID!
    title:String!
    content:String!
    product:ID!
    user:ID!
}

type Cart{
    _id:ID!
    user:ID!
    products:[ID!]
}

type Category{
    _id:ID!
    name:String!
}

type Product{
    _id:ID!
    title:String!
    price:Int!
    image:String!
    description:String!
    user:ID!
    category:ID!
}

type QueryUser{
    _id:ID!
    username:String!
    email:String!
    Cart:ID!
    admin: Boolean!
    signup_date:String!
    token:String!
}
type QueryReview{
    _id:ID!
    title:String!
    content:String!
    product:Product!
    user:User!
}
type QueryCart{
    _id:ID!
    user:User!
    products:[Product!]
}

type QueryCategory{
    _id:ID!
    name:String!
    products:[Product!]
}

type QueryProduct{
    _id:ID!
    title:String!
    price:Int!
    image:String!
    description:String!
    user:User!
    category:Category!
}`