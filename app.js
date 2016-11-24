const http = require('http');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

var favicon = require('serve-favicon');

const db = require('./db.js');
var fs = require('fs');
var list = require('./todolist')

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
    res.json(db.getList());
    console.log("app-get the list!");
    next();
});

app.get('/list/:item_id', function(req,res,next){
    let id = req.params.item_id;
    let item = db.getItem(id);
    if (item)
        res.json(item);
    else
        res.json(`item with id: ${id} was'nt found!`)
    console.log("app-get the item");
    // next();
});

app.post('/list/addItem', function(req,res,next){
    console.log(req.body);
    list.push(req.body);
    db.updateList(req.body);
    console.log(list);
});


app.post('/list/deleteItem', function(req,res,next){
    console.log(req.body);
    list.pop(req.body);
    db.updateList(req.body);
    console.log(list);
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});
