module.exports = `type Query{
    user(id:ID!):QueryUser!
    reviews:[QueryReview!]
    reviewsProductSearch(id:ID!):[QueryReview!]
    review(id:ID!):QueryReview!
    cart(id:ID!):QueryCart!
    categories:[QueryCategory!]
    category(id:ID!):QueryCategory!
    products:[QueryProduct!]
    productsCategorySearch(id:ID!):[QueryProduct!]
    product(id:ID!):QueryProduct!
}`