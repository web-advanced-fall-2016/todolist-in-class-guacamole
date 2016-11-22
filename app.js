const http = require('http');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var favicon = require('serve-favicon');
const port = 3000;

const app = express();

const db = require('./db.js');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/*====================
    YOUR CODE
====================*/

app.use(favicon(__dirname + '/public/favicon.ico'));
//site's favicon

app.use(function(req,res,next){
    // console.log("received an HTTP Request");
    console.log(`Request method is ${req.method}. it's for path: ${req.path}`);
    next();
})

app.get('/list', function(req, res, next) {
    let list = db.getList();
    res.json(list);
    console.log("get the list!");
    next();
});

app.get('/list/:item_id', function(req,res,next){
    let id = req.params.item_id;
    let item = db.getItem(id);
    if (item)
        res.json(item);
    else
        res.json(`item with id: ${id} was'nt found!`)
    next();
});


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});
