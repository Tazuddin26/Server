const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // <= Accept credentials (cookies) sent by the client
}));
app.put('/employee', (req, res) => {
  fs.readFile("database", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const employeeinfoByID = allData.employees.find(x => x.id == req.params.id);
    employeeinfoByID.name = req.body.name;
    fs.writeFile('database', JSON.stringify(allData), () => { })
    res.send(JSON.stringify(employeeinfoByID)) //(allData-Object & employees - Property)
  })
})
app.get('/companys', (req, res) => {
  fs.readFile("companydata", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    res.send(JSON.stringify(allData.profile))
  })
})
app.post('/company', (req, res) => {
  fs.readFile("companydata", 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const companysData = req.body;
    companysData.id = allData.profile.length + 1;
    allData.profile.push(companysData)
    fs.writeFile('companydata', JSON.stringify(allData), () => { })
    res.send(JSON.stringify(companysData));
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

app.get('/employees', (req, res) => {
  fs.readFile("database2", 'utf8', (err, data) => {
    const mainData = JSON.parse(data)
    res.send(JSON.stringify(mainData.abc))
  })
})
app.post('/employee', (req, res) => {
  fs.readFile("database2", 'utf8', (err, data) => {
    const mainData = JSON.parse(data);
    const reqData = req.body;
    if (reqData.Employee_Name.length < 5) {
      res.status(400).send(JSON.stringify({
        error: "Name must be contain atleast 5 Characters"
      }));
      return;
    }
    const rawImageString = reqData.Image.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(rawImageString, "base64");
    reqData.id = mainData.abc.length + 1;
    fs.writeFile(`public/employee/${reqData.id}.jpeg`, buffer, () => { });
    reqData.Image = `${reqData.id}.jpeg`;
    mainData.abc.push(reqData);
    fs.writeFile("database2", JSON.stringify(mainData), () => { });
    res.send(JSON.stringify(reqData));
  });
});
app.get('/infoPrivate', (req, res) => {
  fs.readFile("database2", 'utf8', (err, data) => {
    const allData = JSON.parse(data);
    res.send(JSON.stringify(allData.private))
  })
})
app.post('/privateInfo', (req, res) => {
  fs.readFile('database2', 'utf8', (err, data) => {
    const allData = JSON.parse(data);
    const reqData = req.body;
    if (reqData.localname.length < 5) {
      res.status(400).send(JSON.stringify({
        error: "Name must be contain atleast 5 Characters"
      }));
      return;
    };
    if(reqData.nationality.length < 8) {
      res.status(400).send(JSON.stringify({
         error:"nationality must be contain atleast 8 Characters"
      }));
      return;
    };
    const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(rawImageString, "base64");
    reqData.id = allData.private.length + 1;
    fs.writeFile(`public/empimage/${reqData.id}.jpeg`, buffer, () => { });
    reqData.image = `${reqData.id}.jpeg`;
    allData.private.push(reqData);
    fs.writeFile("database2", JSON.stringify(allData), () => { });
    res.send(JSON.stringify(allData));
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})