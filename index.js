const { response } = require("express");
var express = require("express");
const bodyParser = require('body-parser');
var apiServer = express();
var fs = require("fs");

apiServer.use(bodyParser.urlencoded({ extended: true })); 

var port = 3000;
var host = "localhost";

apiServer.listen(port, host, () => {
    console.log("server running at http://%s:%d", host, port);
});

apiServer.get("/registrazione", (request, response) => {
    response.sendFile(__dirname + '/Pagine/registrazione.html');
});

apiServer.post("/NewRegistrazione", (request, response) => {

    fs.readFile("libJson/account.json", (err,data)=>{
        if(err){
            console.log("err:"+err);

        }else{
            var user = JSON.parse(data);
            user.push({"username":request.body.username,"password":request.body.password});
            fs.writeFile("libJson/account.json", JSON.stringify(user), (err) =>{
                if(err){
                    console.log("err:"+err);
                }
            })
        }

    });
    response.sendFile(__dirname + '/Pagine/Login.html');

});

apiServer.get("/Login", (request, response) => {
    fs.readFile("libJson/meet.json", (err, data) => {
        if (err) {
          console.log("error: " + err);
        } else {
            var meet = JSON.parse(data);
            response.sendFile(__dirname + '/Pagine/Login.html');
        }
        
      });
});

apiServer.post("/VerifyLogin", (request, response)=>{
    
    fs.readFile("libJson/account.json", (err, data) => {
        if (err) {
          console.log("error: " + err);
        } else {
            var students = JSON.parse(data);
            if (students.find(x => x.username === request.body.username) && students.find(x => x.password === request.body.password)){
                response.sendFile(__dirname + '/Pagine/Menu.html');
            }else{
                response.send("Credenziali errate");
            }
        };
      });   
});

apiServer.get("/Gruppo", (request, response) => {
    response.send("");
});

apiServer.get("/CalendarioMeet", (request, response) => {
    fs.readFile("libJson/meet.json", (err, data) => {
        if (err) {
          console.log("error: " + err);
        } else {
            var meet = JSON.parse(data);
            response.send(JSON.stringify(meet, null, 2));
        }
        
      });
});

apiServer.get("/Elimina", (request, response) => {
    response.sendFile(__dirname + '/Pagine/Elimina.html');
});

apiServer.post("/Delete", (request, response) => {;
    response.send("credenziali account da eliminare: " + request.body.username + " " + request.body.password);

});

apiServer.get("/AdminLogin", (request, response) => {
    response.sendFile(__dirname + '/Pagine/AdminLogin.html');
});

apiServer.post("/VerifyAdminLogin", (request, response)=>{
    
    fs.readFile("libJson/Adminaccount.json", (err, data) => {
        if (err) {
          console.log("error: " + err);
        } else {
            var students = JSON.parse(data);
            if (students.find(x => x.username === request.body.username) && students.find(x => x.password === request.body.password)){
                response.sendFile(__dirname + '/Pagine/AdminMenu.html');
            }else{
                response.send("Credenziali errate");
            }
        };
      });   
});

apiServer.get("/addMeet", (request, response) => {
    response.sendFile(__dirname + '/Pagine/newMeet.html');
});

apiServer.post("/newMeet", (request, response) => {
    fs.readFile("libJson/meet.json", (err,data)=>{
        if(err){
            console.log("err:"+err);

        }else{
            var meet = JSON.parse(data);
            meet.push({"Nome":request.body.Nome,"ODG":request.body.ODG,"Data":request.body.Data,"Ora":request.body.Ora});
            fs.writeFile("libJson/meet.json", JSON.stringify(meet), (err) =>{
                if(err){
                    console.log("err:"+err);
                }
            })
        }

    });
    response.sendFile(__dirname + '/Pagine/AdminMenu.html');

});