const { gql } = require('apollo-server-express');

module.exports = gql`
type Post {
    id:ID!
    title:String!
    description:String!
}


type Query {
    totalStudents:Int!
    totalPosts:Int!
    allPosts:[Post]!
   }

input PostInput{
    title:String!
    description:String!
}

type Mutation {
    newPost(input:PostInput):Post!
}   


   `

