const express = require("express");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const mongo = new MongoClient(uri)






































// const { MongoClient } = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const mongo = new MongoClient(uri)

// const app = express()
// app.use(express.json());

// app.get("/create-user",  async (req, res) => {

//   const { _userName, _userEmail, _phone } = req.body

//   try {

//     const database = mongo.db('users');
//     const userAccount = database.collection('user_account');

//     const user = {
//       userName: _userName,
//       userEmail: _userEmail,
//       phone: _phone
//     }

//     await userAccount.insertOne(user);
//     res.status(200).send("SUCCESS")

//   } catch(e) {

//     res.status(500).send("oh no~~~~")
//   }
// })

// app.get("/delete-user/:userName",  async (req, res) => {

//   const { userName } = req.params

//   try {

//     const database = mongo.db('users');
//     const userAccount = database.collection('user_account');

//     await userAccount.deleteOne({ userName: userName });

//     res.status(200).send("SUCCESS")

//   } catch(e) {

//     res.status(500).send("oh no~~~~")
//   }
// })

// const PORT = 3000;

// app.listen(PORT, ()=>{
//   console.log(`App is running on port ${PORT}`)
// })