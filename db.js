let list = require('./todolist.json');
let fs = require('fs');
// let item

let db = {
    getList: ()=> {
        // let ls = Object.assign({},list);
        console.log("db.getList");
        return list;
        //return the copy of the list
    },
    getItem: (id) => {
        for (let item of list) {
            if (item.id == id) {
                let res = Object.assign({}, item); // cloning and return the copy of the item
                return res;
            }
        }
        console.log("db.getItem:" + id);
        return false;
    },
    addItem: (item) => {
        item.id = item.length;
        list.push(item);//Adds new elements to the end of an array, and returns the new length
        db.updateList();//update list
        console.log("db.addItem:" + item);
    },
    deleteItem:(item) =>{
        item.id = item.length;
        list.pop(item);//Removes the last element of an array, and returns that element
        db.updateList();
        console.log("db.deleteItem:" + item);
    },

    updateList: ()=> {
        //update the JSON file
        fs.writeFile('./todolist.json', JSON.stringify(list), (err) => {
           if (err){
            console.log('File not updated');
            }
            console.log('File updated!');
        });
    }
};


module.exports = db;
