var app = require('./server.js')

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.get('/:app_name', function(req, res){
  //app.redirect('/app/'+Applications.findOne({name: req.params.app_name})['id']')
})

app.get('/app/:id', function(req, res){
  findClientForAppID(req.params.id)
})

function findClientForAppID(id){

  var client = ""
  //app.redirect(client['host']+':'+client['port'])
}