const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")


app.get('/', (req, res) => {
  res.send('Bismillah')
})
app.get('/employees', (req, res) => {
  fs.readFile("database",'utf8', (err,data) => {
    const allData = JSON.parse(data)
  res.send(JSON.stringify(allData.employees)) //(allData-Object & employees - Property)
  })
})
app.get('/depertments', (req, res) => {
  fs.readFile("database",'utf8', (err,data) => {
    const allData = JSON.parse(data)
  res.send(JSON.stringify(allData.depertments)) //(allData-Object & employees - Property)
  })
})
app.get('/create-employee/:name', (req, res) => {
  fs.readFile("database",'utf8', (err,data) => {
    const allData = JSON.parse(data)
 allData.employees.push(req.params.name)
 fs.writeFile('database',JSON.stringify(allData), () => {})
 res.send(`${req.params.name} added`)
  })
})
app.get('/create-depertment/:name', (req, res) => {
  fs.readFile("database",'utf8', (err,data) => {
    const allData = JSON.parse(data)
 allData.depertments.push(req.params.name)
 fs.writeFile('database',JSON.stringify(allData), () => {})
 res.send(`${req.params.name} added`)
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})