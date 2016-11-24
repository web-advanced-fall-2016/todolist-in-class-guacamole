# Session 11 / in class exercise

## Team Guacamole: Marielle, Yue
## Steps

### FEATURES

1) load the initial list on client side page
2) Add new item(s) to To Do List
	- after typing, when hit enter or click the add button, add a new item to the list on the server side(into json file)
   - when an item is successfully added to the server side, show the item on client side, and enable remove

3) Delete (completed) item(s) from the To Do List
	- when clicking the remove button on the client side, delete the item on server side
   - refresh the list on client side(remove the item in client side);


### HOW TO RUN THE CODE

Clone or download this folder onto your computer.

On the server side:
    Open Terminal, navigate to the folder, enter -npm install, and after it's done, enter -npm start.

On the client side:
    once the server is running, open web browser, open localhost on port 3000.


### LIBRARIES / REFERENCES

Team Guacamole referenced styling and web wireframes from a previous MFADT bootcamp web project example. This included simple HTML structure as well as some client-side Javascript for add/delete actions for To Do List items.

Team Guacamole viewed the professor's API example to understand the "GET" and "POST" request on the server side.


### Server Info and API Endpoints

A NodeJS server is setup. Currentlly, it cannot be accessed through ip address, you have to run the server locally, you will need to clone the server code from the this repository. More information, check out "HOW TO RUN THE CODE"
Team Guacamole's server side uses JSON (http://json.org/) format. The server provides the following API endpoints:

#### Students endpoint

| Verb | URL endpoint                | Resource description                     |
| :--- | --------------------------- | ---------------------------------------- |
| GET  | /list                   | get list of all to do items |
| GET  | /list/`$item-id`     | get info of each to do item with id=`$item-id`
| POST  | /list/addItem | save info of each newly add item to the server |
| POST  | /students/deleteItem | delete info of selected item from the server|

##### /list

```json
[
  {
    "description":"avocado",
    "id":0
  },
  {
   "description":"pineapple",
   "id": "1"
  },
  {
   "description":"apple",
   "id": "2"
  },
  ...
]
```
##### /list/`$item-id`

```json
{
   "description":"avocado",
   "id":0
}
```


## Requirements
### Setup

We are going to split into groups of two. Each team should collaborate to reach our goal. It's gonna be like the idea of [pair programming](https://en.wikipedia.org/wiki/Pair_programming). Engagement of both the students in coding is important. How to split the work is totally up to the teams (i.e. one person for front-end and the other for back-end).

Start from planning. Before you jump into coding, take 5-10 minutes to define your approach and steps within your team. Maybe draw a simple sketch of your design. While one person is coding, the other team member is responsible to provoke ideas, make sure of code validity, recommend better ways of implementation or **most importantly ask questions if he/she doesn't understand something**.

I will be roaming around between teams. You can ask me questions or Google them :). You **should** push your project to this repository before you leave the class.

The base scaffold provided is nothing but the structure. Make your project as nice/functional as you can. But, **don't over complicate it**. Start with the minimal feasible goal and improve if you had time.

This is an opportunity to teach and learn together. Let's make it fun and productive.

Assignment link [https://classroom.github.com/group-assignment-invitations/acc7a44eff55799f00ac98333add33e6](https://classroom.github.com/group-assignment-invitations/acc7a44eff55799f00ac98333add33e6)

### Goal

Your goal is to build a very simple Todo list application. Here are some examples:

[https://github.com/component/todo](https://github.com/component/todo)

[http://dreamerslab.com/blog/en/write-a-todo-list-with-express-and-mongodb/](http://dreamerslab.com/blog/en/write-a-todo-list-with-express-and-mongodb/)

Provided within this repository is a basic scaffold that includes an `express` application that runs a serve on `localhost:3000`. Run the server with: `npm start`. Build your application on tip of this scaffold.

You are allowed to use third party libraries/tools like JQuery/Bootstrap.

#### Required features

- Add new item.
- Remove existing items.
- Viewer should be able to see all the existing items.
- Each Item should at least have a description.
- List should be persistent upon reloading the page. In other words, it should be persistent as long as the server instance is running.

#### Bonus features

- Update existing items.
- Improve UX/UI by adding signifiers for successful save/remove/update of items on server.
- Save the items on server. In other words, make it persistent. (Save it in a `.json` file or a database if interested/checkout `mongoose` )




