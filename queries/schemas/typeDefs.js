module.exports = `
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
}`