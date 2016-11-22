let list = require('./todolist.json');
let fs = require('fs');
// let item

let db = {
    getList: ()=> {
        // let ls = Object.assign({},list);
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
        return false;
    },
    addItem: (item) => {
        item.id = item.length;
        list.push(item);//push the changes back to json file
        db.updateList();//update list
    },
    // removeItem:(item) =>{

    // },

    updateList: ()=> {
        fs.writeFile('./todolist.json', JSON.stringify(list), (err) => {
         if (err){
            console.log('File not updated');
            console.log('File updated!');
        }
    });
    }
};


module.exports = db;
