const express = require("express");
const userRoute = require("./userRoute")

const app = express()
app.use(express.json());
app.use(userRoute)

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})        