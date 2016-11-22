let taskArray = [];
let tempArray = [];

let baseURL = "localhost:3000";

var updateTasks = function(){
    var taskListHolding = document.getElementById('taskList');

    taskListHolding.innerHTML = '';

    var len = taskArray.length;
    var i;

    for(i = 0; i < len; i++){
        console.log('task ' + i + ': ' + taskArray[i]);

        var newTask = document.createElement('div');

        newTask.id = i;
        newTask.className = 'task';

        var task = document.createElement('p');
        task.innerText = taskArray[i];

        var deleteButton = document.createElement('button');
        deleteButton.id = 'deleteButton';
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', function(e){
            e.preventDefault();
            deleteTask(e);
        });
        newTask.appendChild(task);
        newTask.appendChild(deleteButton);

        taskListHolding.appendChild(newTask);
    };
};

//save task
var saveTask = function(){
    $.ajax({
        method: "GET",
        url: `${baseURL}`
    }).done(function (response) {
        for (let student of response) {
            $.ajax({
                method: 'GET',
                url: `${baseURL}/list`
            }).done(function(res){
                    // console.log(res.profilepicture);
                    var taskInput = document.querySelector('item');
                    var item = taskInput.value;

                    taskArray.push(newTask);
                    updateTasks();
                    taskInput.value = '';
                    console.log(taskArray);
                });
        }
    });
};

var deleteTask = function(e){

    // var taskNumber = e.target.parentElement.id;
    // taskArray.splice(taskNumber, 1);

    $.ajax({
        method: 'GET',
        url: `${baseURL}/taskList`
    }).done(function(res){

        tempArray =
        updateTasks();

    });


};


var init = function(){

    var addButton = document.getElementById("addButton");

    //add event listener for click
    addButton.addEventListener('click', function(e){

        e.preventDefault();
        saveTask();
    });
};

window.onload = init();
