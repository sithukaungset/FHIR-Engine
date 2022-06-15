var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require("cors");


app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(
    cors({
        origin:true,
        credentials:true,
        methods: ["POST","PUT","GET","OPTIONS","HEAD"]
    }
)
);

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
app.use(express.static('css'));

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { json } = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//app.engine('pug', require('pug').__express)
// url('https://cdn.dribbble.com/users/662779/screenshots/5122311/server.gif');


//app.engine('pug', require('pug').__express)
//app.set("view engine", "pug");



app.get('/api/create', function (req, res){
    res.render('hapi.html');

});



app.get('/api/seller', function (req, res){
    res.render('seller.html');
});

app.put('/api/create', function (req,res){
    var request = req.body.resourceType;
    console.log("Create PHR success");
    
});

var url = "https://reqbin.com/echo/get/json";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();






app.listen(22650,"203.247.240.226");

var http = require('http');
var os = require('os');
var versions_server = http.createServer( (request, response) => {
    response.end('Versions: ' + JSON.stringify(process.versions) +
                 ' listening on' + JSON.stringify(versions_server.address()) +
                 ' interfaces are ' + JSON.stringify(os.networkInterfaces()));
    });


