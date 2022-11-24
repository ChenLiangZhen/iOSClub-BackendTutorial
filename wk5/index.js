const express = require("express");

const app = express()
app.use(express.json());

app.get("/message", (req, res) => {

  console.log("收到 Request ㄌ")
  res.send("99999999999999999")

})

app.get("/message-in-body", (req, res) => {
  
  const { messageText } = req.body

  console.log("收到 Request ㄌ")
  res.send("我想想... 你傳給我的訊息應該是： " + messageText + "，怎麼樣？ 佩服我吧！！！！")

}) 

app.get("/get-user-info", (req, res) => {  
  
  const { userInfo } = req.body

  console.log("收到 Request ㄌ")
  res.send( "這位客戶叫做：" + userInfo.fullName + "\n" + 
            "他住在：" + userInfo.addr + "\n" + 
            "他的電話是：" + userInfo.phone + "\n" + 
            "他最近買的一個東西是：" + userInfo.orderHistory[0].prod_name + "\n" +
            "這個商品的詳細資訊是：" + JSON.stringify(userInfo.orderHistory[0], " ", 2)
  )
}) 

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port gfgfg ${PORT}`)
})   