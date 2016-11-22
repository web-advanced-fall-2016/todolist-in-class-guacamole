// steps:
// 1. load the initial list on client side page
// 2. after typing and clicking add button, add a new item to the list on the server side(into json file)
// 3. when an item is successfully added to the list array, show the item on client side, and enable remove
// 4. when clicking the remove button on the client side, delete the item on both sides(server and client)
// 5. refresh the list after adding or deleting an item

// console.log('this is main.js');

(function(){
    console.log("heyhey");

    let baseURL = "http://localhost:3000";
    let itemArray = [];
    let list = document.querySelector('.taskList');
    let addBtn = document.querySelector('.addButton');

    function updateList(){
        console.log('updateUpdateUpdate');
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

                    let deleteBtn = document.querySelector('.deleteButton');
                    deleteBtn.addEventListener('click', function(e){
                        if(e.target === this){
                            // console.log('clickkkkk');
                            e.preventDefault();
                            let itemID = e.target.parentElement.id;
                            deleteItem(itemID);
                        }

                    });
                });
            }
        });
    };

    function addItem(){
        console.log("addddddd");
        $.ajax({
            method: "GET",
            url: `${baseURL}/list`,
        }).done(function (res) {
            let taskInput = document.querySelector('#inputBox');
            let description = taskInput.value;
            let newItem = {description: description, id: itemArray.length+1}
            itemArray.push(newItem);
            console.log(newItem);
            addToServer(newItem);
        });
    };

    function deleteItem(item){
        console.log("delete!!!!!");
        deleteInServer(item);
    }

    function addToServer(newItem){
        $.ajax({
            method: "POST",
            url: `${baseURL}/list`,
            data: newItem,
        });
        // updateList();
    }

    function deleteInServer(item){
        // updateList();
    }

    function init(){
        console.log('initialize please');
        //add event listener for click
        addBtn.addEventListener('click', function(e){
            e.preventDefault();
            addItem(e);
        });
        updateList();
    }

    init();

})();
