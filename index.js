const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true, // <= Accept credentials (cookies) sent by the client
}));

app.get('/', (req, res) => {
  res.send('Bismillah')
})
app.get('/employee', (req, res) => {
  fs.readFile("database",'utf8',(err, data) => {
    const allData = JSON.parse(data)
    res.send(JSON.stringify(allData.employee)) //(allData-Object & employees - Property)
  })
})
app.put('/employee/:id', (req, res) => {
  fs.readFile("database", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const employeeinfoByID = allData.employee.find(x =>x.id==req.params.id);
    employeeinfoByID.name = req.body.name;
    allData.employee.push(employeeinfoByID)
    fs.writeFile('employee', JSON.stringify(allData), () => { })
    res.send(JSON.stringify(employeeinfoByID)) //(allData-Object & employees - Property)
  })
})
app.post('/create-employee', (req, res) => {
  fs.readFile("database", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const employeeData = req.body;
    employeeData.id = allData.employee.length + 1;
    allData.employee.push(employeeData)
    fs.writeFile('database', JSON.stringify(allData), () => { })
    res.send(`${req.body.name} added`)
  })
})
app.get('/create-department/:name', (req, res) => {
  fs.readFile("departDatabase", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    allData.department.push(req.params.name)
    fs.writeFile('departDatabase', JSON.stringify(allData), () => { })
    res.send(`${req.params.name} added`)
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})