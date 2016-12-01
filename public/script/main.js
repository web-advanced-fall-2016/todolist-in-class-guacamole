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

    function update(){
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
                    <div class = deleteButton>x</div>
                    `
                    list.appendChild(item);
                    itemArray.push(res);

                    console.log(res);

                    let deleteBtn = item.querySelector(".deleteButton");
                    deleteBtn.addEventListener('click', function(){
                        deleteItem(res);
                        console.log(res);
                    });
                });
            }
        });
    };

    function addItem(event){
        let description = input.value;
        newItem = {description: description};
        itemArray.push(newItem);
        // console.log(newItem);
        $.ajax({
            method: "POST",
            data: newItem,
            url: `${baseURL}/list/addItem`
        }).done(function(res){
            // console.log(res.data);
            if( res.message == 'success') {
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.id = res.data.id;
                newItem.innerHTML = `
                <div class = "text">${res.data.description}</div>
                <div class = deleteButton>x</div>
                `;

                list.appendChild(newItem);
                let deleteBtn = newItem.querySelector(".deleteButton");
                deleteBtn.addEventListener('click', function(){
                    deleteItem(res);
                    console.log(res);

                });

                input.value = '';
            }
        });
    }

    function deleteItem(evnt){
        let data = evnt;
        let itemNumber = evnt.id;
        console.log(evnt.id);

        $.ajax({
            method: "POST",
            data: data,
            url: `${baseURL}/list/deleteItem`
        }).done(function(res){
            console.log(res);
            // update();
        });
    }


    function init(){
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
        update();
    }

    window.onload = function(){
        init();
    }

})();
