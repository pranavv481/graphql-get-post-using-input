const express = require("express");
const { ApolloServer} = require('apollo-server-express');
const http = require("http");
require('dotenv').config();
const {fileLoader, mergeTypes, mergeResolvers} = require("merge-graphql-schemas");
const path = require("path")
const app = express()
const mongoose = require("mongoose");

const db = async ()=>{
  try{
     const conn = await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
     if(conn){
       console.log("database connected")
     }else{
       console.log("Failed to connect database")
     }
  }catch(err){
     console.log(err)
  }
}

db();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname,"./typeDefs")))

const resolvers = mergeResolvers(fileLoader(path.join(__dirname,"./resolvers")))

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  apolloServer.applyMiddleware({app})

   const httpServer = http.createServer(app);

app.get("/check",(req, res)=>{
    res.send("hii")
})

app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT}`)
    console.log(`graphql server started at ${process.env.PORT} ${apolloServer.graphqlPath}`)
})

