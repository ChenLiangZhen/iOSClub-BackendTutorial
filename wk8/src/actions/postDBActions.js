const { MongoClient } = require("mongodb");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

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

const postActions = {
    createPost
}

module.exports = postActions