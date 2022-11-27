const express = require("express");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userRoute = express.Router()

async function createUser(_userName, _userEmail, _phone) {
    return new Promise(async (resolve, reject) => {

        try {
            const database = client.db('users');
            const userAccount = database.collection('user_account');

            const user = {
                userName: _userName,
                userEmail: _userEmail,
                phone: _phone
            }

            await userAccount.insertOne(user);

            resolve("USER CREATED : " + JSON.stringify(user, "", 2))

        } catch (e) {

            reject("USER CREATION ERROR")

        }
    })
}

async function deleteUser(_userName) {
    return new Promise(async (resolve, reject) => {

        try {

            const database = client.db('users');
            const userAccount = database.collection('user_account');

            const result = await userAccount.deleteOne({ userName: _userName });
            console.log(result)

            if(result.deletedCount === 0) {
                reject("USER DELETION ERROR: NO MATCHING TARGET")
            }

            resolve("USER DELETED : " + _userName)

        } catch (e) {

            reject("USER DELETION ERROR: INTERNAL ERROR")

        }
    })      
}

userRoute.get("/create-user",  (req, res) => {

    const { _userName, _userEmail, _phone } = req.body
   
    createUser(_userName, _userEmail, _phone).then( 
      resolve => { 
      res.status(200).send(resolve) 
   
    }, reject =>{
      res.status(500).send(reject) 
    }) 
})
  

userRoute.get("/delete-user/:_userName",  (req, res) => {

    const { _userName } = req.params 
  
    deleteUser( _userName ).then( 
        resolve => {
        res.status(200).send(resolve) 

    }, reject =>{
        res.status(500).send(reject)
    })
}) 

module.exports = userRoute