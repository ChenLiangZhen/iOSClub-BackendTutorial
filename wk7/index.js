const express = require("express");
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")

const app = express()
app.use(express.json());
app.use(userRoute)
app.use(postRoute)

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})