const express = require("express")
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/message", (req, res) => {
  
  console.log("收到 Request ㄌ")
  res.send("我是 Response 🤪")
})

app.get("/message/:length", (req, res) => {

  const { length } = req.params
  console.log(length)

  try {

    if (typeof(length) != "number") {

      return res.status(422).send({ error: "Argument invalid" })
    
    }

    res.send(lorem.generateSentences(100))

  } catch (e) {

    return res.status(400).send({ error: "Internal Error" })

  }

})

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})