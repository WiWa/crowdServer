var app = require('./server.js')

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.post('/api/photo',function(req,res){
  if(done==true){
    //console.log(req.files);
    res.end("File uploaded.");
  }
});