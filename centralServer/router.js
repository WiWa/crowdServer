var app = require('./server.js')

app.get('/',function(req,res){
      res.sendfile("index.html");
});

