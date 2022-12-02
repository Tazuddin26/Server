const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")

app.get('/', (req, res) => {
  res.send('Bismillah')
})
app.get('/start', (req, res) => {
  fs.writeFile("Count",'0', () => {})
  res.send('Bismillah')
})
app.get('/num', (req, res) => {
  fs.readFile("Count",'utf8', (err,data) => {
    const x = parentInt(data)+1
    const text = x.toString()
    fs.writeFile('Count',text, () => {})
    res.send("Count Increased")
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})