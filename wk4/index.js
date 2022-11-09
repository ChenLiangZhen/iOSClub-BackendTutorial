const express = require("express");
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4
//   }
// });

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

    if (!Number.isInteger(parseInt(length))) {

      return res.status(422).send({ error: "叫你打數字，是在哈囉？" })
    
    }

    console.log(parseInt(length))
    return res.status(200).send({ input: length })

  } catch (e) {

    return res.status(400).send({ error: "天時地利伺服器出錯拉" })

  }

})

// app.get("/calculator/:mode/:numberA/:numberB", (req, res) => {

//   const { mode, numberA, numberB } = req.params
//   console.log(mode + " " + numberA + " " + numberB)

//   try { 

//     if (!Number.isInteger(parseInt(numberA)) || !Number.isInteger(parseInt(numberB))) {

//       return res.status(422).send({ error: "不是數字..." })
    
//     }

//     switch(mode) {

//       case "plus":
//         return res.status(200).send({ mode: "PLUS", result: parseInt(numberA) + parseInt(numberB)})
//         break

//       case "minus":
//         return res.status(200).send({ mode: "MINUS", result: parseInt(numberA) - parseInt(numberB)})
//         break
//     }
    

//   } catch (e) {

//     console.log(e)
//     return res.status(400).send({ error: "今天是個不適合按計算機的一天..." })

//   }

// })

// app.get("/score/:ming/:wang", (req, res) => {

//   const { ming, wang } = req.params
//   console.log(ming + " " + wang)

//   try { 

//     if (!Number.isInteger(parseInt(ming)) || !Number.isInteger(parseInt(wang))) {

//       return res.status(422).send({ error: "這是尛成績？！" })
    
//     }

//     if( ming > 100 || wang > 100) {

//       return res.status(200).send({ error: "官商勾結才有這種成績！！！" })
//     }

//     if( ming < 0 || wang < 0) {

//       return res.status(200).send({ error: "你在陰間考試嗎？" })
//     }

//     return res.status(200).send({ ming: parseInt(ming), wang: parseInt(wang)})

//   } catch (e) {

//     return res.status(400).send({ error: "今天是個不適合公佈成績的一天..." })

//   }

// })

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})