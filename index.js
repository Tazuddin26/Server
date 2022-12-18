const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true, // <= Accept credentials (cookies) sent by the client
}));
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
    fs.writeFile('database', JSON.stringify(allData), () => { })
    res.send(JSON.stringify(employeeinfoByID)) //(allData-Object & employees - Property)
  })
})
app.get('/companys', (req, res) => {
  fs.readFile("companydata",'utf8',(err, data) => {
    const allData = JSON.parse(data)
    res.send(JSON.stringify(allData.companys)) //(allData-Object & employees - Property)
  })
})
app.post('/create-company', (req, res) => {
  fs.readFile("companydata", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const companysData = req.body;
    companysData.id = allData.companys.length + 1;
    allData.companys.push(companysData)
    fs.writeFile('companydata', JSON.stringify(allData), () => { })
    res.send(`${req.body.name}`)
  })
})
app.post("/signin", (req, res) => {
  fs.readFile("database", "utf8", (err, data) => {
      const allData = JSON.parse(data);
      const userData = req.body;
      const fusers = allData.users
          .filter(user => user.username === userData.username && user.password === userData.password)
      if (fusers.length > 0) {
          res.send(JSON.stringify(fusers[0]));
      }
      else {
          res.status(400).send()
      }
  });
})
app.post("/signup", (req, res) => {
  fs.readFile("database", "utf8", (err, data) => {
      const allData = JSON.parse(data);
      const userData = req.body;
      userData.id = allData.users.length + 1;
      allData.users.push(userData);
      fs.writeFile("database", JSON.stringify(allData), () => { });
      res.send(JSON.stringify(userData));
  });
});
app.get('/registeredStudents', (req, res) => {
    fs.readFile("imagestore", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.students))
    })
})
app.post("/studentRegistration", (req, res) => {
    fs.readFile("imagestore", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const reqData = req.body;
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        reqData.id = allData.students.length + 1;
        fs.writeFile(`public/student/${reqData.id}.jpeg`, buffer, () => { });
        reqData.image = `${reqData.id}.jpeg`;
        allData.students.push(reqData);
        fs.writeFile("imagestore", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(reqData));
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})