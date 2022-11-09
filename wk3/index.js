const express = require("express")

const app = express()
app.use(express.json());

app.get("/message", (req, res) => {
  
  console.log("收到 Request ㄌ")
  res.send("我是 Response 🤪")
})

app.get("/message-hello", (req, res) => {
  
  console.log("Hello !!!)
  res.send("Hello !!! 我是 API Response.")
})