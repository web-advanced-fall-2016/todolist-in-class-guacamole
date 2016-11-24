// steps:
// 1. load the initial list on client side page

// 2. add item function:
// 2.1 after typing, when hit enter or click the add button, add a new item to the list on the server side(into json file)
// 2.2 when an item is successfully added to the server side, show the item on client side, and enable remove

// 3. remove item function:
// 3.1 when clicking the remove button on the client side, delete the item on server side
// 3.2 refresh the list on client side(remove the item in client side);


// console.log('this is main.js');

(function(){
    console.log("heyhey");

    let baseURL = "http://localhost:3000";
    let itemArray = [];
    let list = document.querySelector('.taskList');
    let addBtn = document.querySelector('.addButton');
    let input = document.querySelector('#inputBox');

    if (document.readyState != "loading") {
        app();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            app();
        }, false);
    }

    function init(){
        console.log('getgetget');
        $.ajax({
            method: "GET",
            url: `${baseURL}/list`
        }).done(function (res) {
            for(let item of res){
                $.ajax({
                    method: 'GET',
                    url: `${baseURL}/list/${item.id}`
                }).done(function(res){
                    item = document.createElement('div');
                    item.classList.add('item');
                    item.id = `${res.id}`;
                    item.innerHTML = `
                    <div class = "text">${res.description}</div>
                    <div class = deleteButton>X</div>
                    `
                    list.appendChild(item);
                    itemArray.push(res);
                    console.log(res.id);
                });
            }
        });
    };

    function addToServer(data){
        $.ajax({
            method: "POST",
            data:data,
            url: `${baseURL}/list/addItem`,
            success:console.log(data + "sent")
        }).done(function(res){
            addItem(res);
        });
    };

    function addItem(newItem){
        // console.log("addddddd");
        // $.ajax({
        //     method: "GET",
        //     url: `${baseURL}/list`,
        // }).done(function (res) {

            let description = input.value;
            newItem = {description: description, id: itemArray.length}
            itemArray.push(newItem);
            console.log(newItem);
            addToServer(newItem);

            newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.id = itemArray.length-1;
            newItem.innerHTML = `
            <div class = "text">${description}</div>
            <div class = deleteButton>X</div>
            `
            list.appendChild(newItem);
        // });

        console.log("client updated");
    }

    function deleteInServer(item){
        $.ajax({
            method: "POST",
            data:data,
            url: `${baseURL}/list/deleteItem`,
            success:console.log(data + "sent")
        }).done(function(res){
            deleteItem(res);
        });
    };

    function deleteItem(item){
        let deleteBtn = document.querySelector('.deleteButton');
        deleteBtn.addEventListener('click', function(e){
            if(e.target === this){
                // console.log('clickkkkk');
                e.preventDefault();
                let itemID = e.target.parentElement.id;
                deleteInServer(itemID);
            }
        });
    }


    function app(){
        console.log('initialize please');
        //add event listener for click
        addBtn.addEventListener('click', function(evnt){
            evnt.preventDefault();
            addItem(evnt);
        });

        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                addBtn.click();
            }
        });
        init();
    }

})();
