var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');
mongoose.connect('mongodb://<user>:<psd>@NOSQL-DATABASE-LINK:port/todos');
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo', todoSchema); //instance of table

// var itemOne = Todo({item: 'new event'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });
//
// var data = [{item:'1st event'}, {item:'2nd event'},{item:'3rd event'}];

module.exports = function(app) {
  app.get('/todo',function(req,res){
    //select all from db
    Todo.find({},function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })

  });

  app.post('/todo', urlencodedParser, function(req, res){
    //data.push(req.body);
    var itemOne = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
    res.json(data); //response doesn't matter since main js will reload the page
                    //reloading will route in get
  });

  app.delete('/todo/:item', function(req, res){
    // data = data.filter(function(todo){
    //   //filter will only keeps the item that returns true
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({item: req.params.item.replace(/-/g, "-")}).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    })
  });
}
