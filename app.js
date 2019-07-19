var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs'); // use ejs as templete engine

app.use(express.static('./public')); // set the root dir for static src request

todoController(app);

app.listen(3000);

console.log('Listening port 3000...');
