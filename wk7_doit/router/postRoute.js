const express = require("express");
const { MongoClient } = require("mongodb");

const postRoute = express.Router()

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('data');
const userAccount = userDB.collection('user-post');

postRoute.get("/test", (req, res)=> {
    res.status(200).send("post success!!!!!!")
})

module.exports = postRoute