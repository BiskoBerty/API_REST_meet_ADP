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