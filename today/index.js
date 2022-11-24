const express = require("express");
const { MongoClient } = require("mongodb");
const userRoute = require("./src/userRoute")

const app = express()
app.use(express.json());
app.use(userRoute)


const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})    