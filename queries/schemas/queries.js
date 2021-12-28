module.exports = `type Query{
    user(id:ID!):User!
    reviews:[Review!]
    review(id:ID!):Review!
    cart(id:ID!):Cart!
    categories:[Category!]
    category(id:ID!):Category!
    products:[Product!]
    product(id:ID!):Product!
}`