const express = require("express");
const postRoute = express.Router()

const { createPost } = require("../actions/postDBActions");

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