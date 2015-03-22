var app = require('./server.js')
var mongoose = require('mongoose') 
mongoose.connect('mongodb://localhost/test')  //pending connection to test database

app.get('/',function(req,res){
  res.sendfile("index.html");
});


/*
app.get('/app/:id', function(req, res){
  findClientForAppID(req.params.id)
})
*/