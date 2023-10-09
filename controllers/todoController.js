var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhishek:abhi2@cluster0.saa9ga1.mongodb.net/');

var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model("Todo", todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
    
    app.get('/todo', function(req, res) {
        Todo.find({})
            .then(data => {
                // Render the 'todo' view with the retrieved data
                res.render('todo', { todos: data });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Error retrieving todos");
            });
    });
    


app.post('/todo', urlencodedParser, function(req,res){
    
    const newTodo = new Todo(req.body);
    newTodo.save()
        .then(savedTodo => {
            res.json(savedTodo);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error saving todo");
        });
});


app.delete('/todo/:item', function(req, res) {
    const itemToDelete = req.params.item.replace(/-/g, ' ');

    Todo.deleteOne({ item: itemToDelete })
        .then(() => {
            console.log('Item deleted:', itemToDelete);
            res.json({ message: 'Item deleted' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error deleting item' });
        });
});


}