var express = require('express');
var todoController = require('./controllers/todoController')
var app = express();

// set up temple engine 
app.set('view engine','ejs');

//static file 

app.use(express.static('./public'))

// fire controller
todoController(app);

//listen to port

app.listen(3000);

console.log('You are listening to port: 3000')