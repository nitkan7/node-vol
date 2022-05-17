const express = require('express')
const cors = require('cors');
var bodyParser = require('body-parser')
const loudness = require('loudness')
const http = require("http");
const url = require("url");

async function increase() {
const vol = await loudness.getVolume()
console.log(vol)
await loudness.setVolume(vol+5)
// vol = 45
}
async function decrease() {
  const vol = await loudness.getVolume()
  console.log(vol)
  await loudness.setVolume(vol-5)
  // vol = 45
  }
const app = express()
const port = 9000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.send('Got a POST request')

  console.log(req.body)
  if(req.body.out=="paper"){
    console.log("increasing")
    increase()
  }
  //if(req.body.out=='paper')
  if(req.body.out=="rock"){
    console.log("decreasing")
    decrease()
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
