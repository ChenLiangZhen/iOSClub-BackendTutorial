const express = require("express");
const { MongoClient } = require("mongodb");

const userRoute = express.Router()

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('users');
const userAccount = userDB.collection('user_account');

async function createUser(_userName, _userEmail, _phone) {
    return new Promise(async (resolve, reject) => {

        try {

            const user = {

                userId: new Date().getTime().toString().substring(5,13),
                userName: _userName,
                userEmail: _userEmail,
                phone: _phone
            }

            await userAccount.insertOne(user);

            resolve("User created : " + JSON.stringify(user, "", 2))

        } catch (e) {

            reject("User creation error: " + e)
        }
    })
}

async function deleteUser(_userId) {
    return new Promise(async (resolve, reject) => {

        try {

            const result = await userAccount.deleteOne({ userId: _userId });
            console.log(result)

            if(result.deletedCount === 0) {
                reject("User deletion error: NO MATCHING TARGET")
            }

            resolve("User deleted: " + _userName)

        } catch (e) {

            reject("User deletion error: INTERNAL ERROR")

        }
    })      
}

async function getUser(_userId) {
    return new Promise(async (resolve, reject) => {

        try {


        } catch (e) {


        }
    })      
}

async function updateUser(_userName) {
    return new Promise(async (resolve, reject) => {

        try {


        } catch (e) {


        }
    })      
}

userRoute.post("/create-user",  (req, res) => {

    const { _userName, _userEmail, _phone } = req.body

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_userEmail)) {
        return res.status(400).send("User creation error: Email Invalid.")
    }
   
    createUser(_userName, _userEmail, _phone).then( 
      resolve => { 
      res.status(200).send(resolve) 
   
    }, reject =>{ 

        if (reject.toString().includes("E11000")){

            res.status(422).send("User creation error: Duplicated Email.")

        } else{

            res.status(422).send(reject) 
        }

    }) 
})
  

userRoute.post("/delete-user/:_searchId",  (req, res) => {

    const { _userName } = req.params 
  
    deleteUser( _userName ).then( 
        resolve => {
        res.status(200).send(resolve) 

    }, reject =>{
        res.status(500).send(reject)
    })
})

userRoute.post("update-user", (req, res) => {
    
    updateUser()
    
})

userRoute.post("get-user", (req, res) => {
    
    getUser()

})

module.exports = userRoute