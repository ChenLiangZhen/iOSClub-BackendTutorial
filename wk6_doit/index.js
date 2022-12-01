const express = require("express");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const mongo = new MongoClient(uri)

const app = express()
app.use(express.json());

app.post("/create-user",  async (req, res) => {

    const { _userName, _userEmail, _phone } = req.body

    try {

        const database = mongo.db('users')
        const userAccount = database.collection('user_account')

        const user = {
            userName: _userName,
            userEmail: _userEmail,
            phone: _phone
        }

        await userAccount.insertOne(user);

        res.status(200).send("SUCCESSFULLY CREATED USER: " + _userName)

    } catch (e) {

        res.status(500).send("ERROR:" + e)

    }

})

app.post("/delete-user/:_userName",  async (req, res) => {

    const { _userName } = req.params

    try {

        const database = mongo.db('users')
        const userAccount = database.collection('user_account')

        const result = await userAccount.deleteOne({ userName: _userName });
        console.log(result)

        if(result.deletedCount === 0) {

            res.status(422).send("Nothing to delete.")

        } else {

            res.status(200).send("SUCCESS")
        }

        
    } catch (e) {

        res.status(500).send("ERROR")
    }
    
})

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})