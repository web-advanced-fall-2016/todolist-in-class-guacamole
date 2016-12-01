const http = require('http');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

var favicon = require('serve-favicon');

const db = require('./db.js');
var fs = require('fs');
var list = require('./todolist.json')

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
    let data = req.body;
    if( data.description) {
        let newItem = {
            description: data.description,
            id: list.length
        };
        list.push(newItem);
        res.json({message: 'success', data: newItem});
        db.updateList(data);
    }else {
        res.json({message: 'error', data: {}});
    }
});


app.post('/list/deleteItem', function(req,res,next){
    console.log(req.body);
    let data = req.body;
    let deleteItem =req.body.id;
    // if( data.description) {
    //     let newItem = {
    //         description: data.description,
    //         id: list.length
    //     };
    //     list.push(newItem);
    //     res.json({message: 'success', data: newItem});
    //     db.updateList(data);
    // }else {
    //     res.json({message: 'error', data: {}});
    // }
    // console.log(data);
    let deleted = list.splice(deleteItem, 1);

    db.updateList();
    console.log(deleted);
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});
