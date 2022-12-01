const express = require("express");
const { MongoClient } = require("mongodb");

const postRoute = express.Router()

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('users');
const userAccount = userDB.collection('user_account');

const dataDB = client.db('data');
const userPost = dataDB.collection('user_post');

async function createPost(_postTitle, _postContent, _postAuthor, _userId) {
    return new Promise(async (resolve, reject) => {

        try {

            const post = {

                postId: "post_" + new Date().getTime().toString().substring(5,13),
                userId: _userId,
                postDate: new Date(),
                postTitle: _postTitle,
                postContent: _postContent,
                postAuthor: _postAuthor,
            }

            await userPost.insertOne(post);

            resolve("Post created : " + JSON.stringify(post, "", 2))

        } catch (e) {

            reject("Post creation error: " + e)
        }
    })
}

postRoute.post("/create-post/:_userId",  (req, res) => {

    const { 
         _postTitle, 
         _postContent, 
         _postAuthor
    } = req.body

    const { _userId } = req.params

    createPost(_postTitle, _postContent, _postAuthor, _userId).then( 
      resolve => { 
      res.status(200).send(resolve) 
   
    }, reject =>{ 

        res.status(422).send(reject) 
    }) 
})

module.exports = postRoute