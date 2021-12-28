module.exports  = `type Mutation{
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
}`