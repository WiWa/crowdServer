var express=require("express") 
var multer  = require('multer') 
var app = module.exports = express() 
var fs = require('fs')
var done=false 
client_port = 4000

var mongoose = require('mongoose') 
mongoose.connect('mongodb://localhost/test')  //pending connection to test database
var db = mongoose.connection 
db.on('error', console.error.bind(console, 'connection error:')) 
db.once('open', function (callback) {})  //test if connection is successful

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename+Date.now() 
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true 
  }
})) 

/*Handling routes.*/
require('./router.js') 

app.post('/upload',function(req,res){
  if(done==true){
    makeApp(req.body.appName)
    var newName = req.files.fileName.name
    var origName = req.files.fileName.originalname
    fs.renameSync("./uploads/"+newName, "./uploads/"+origName)
    //extract_deploy("./uploads/"+origName, req.body.appName, req.body.index)
    //Tell app clienteles to download and deploy
    res.end("File uploaded.");
  }
})

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000") 
}) 

var clientSchema = mongoose.Schema({
	host: String,
	port: String,
	busy: Boolean
})  //reference to a Schema and definition of client
var Client = mongoose.model('Client', clientSchema)  //compile Schema into a model

var appSchema = mongoose.Schema({
  name: String,
  clientele: Array
})  //Reference to a Schema and definition of app
var App = mongoose.model('App', appSchema)  //compile Schema into a model


function makeClient(host, port) {
	var client1 = new Client({host: host, port: port, busy: false})
	client1.save(function(err) {
		if(err) return console.error(err)
	}) //save to database
}


function makeApp(name) {
  var clientele = [] //will represent array of clients that have been delegated the app	
  App.findOne({name: name}, function(err, appFound) {
    //find app in database  if not found, create new app object and save to database
    if(!appFound) {
      Client.findOne({busy: false}, function(err, clients) {
        var app1 = new App({name: name, clientele: [clients]}) 
        console.log(app1)
        app1.save(function(err, app1) {
          if(err){
            console.error(err)
          } 
        })
      })      
    }
  })

}

Client.remove({},function(){
  // Fake Client OP
  makeClient("1.1.1.1", "9000")
  Client.findOne({busy:false}, function(err, ret){console.log(ret)})
})
App.remove({},function(){
  // Fake App OP
  //makeApp("myapp")
})



app.get('/:app_name', function(req, res){
  App.findOne({name: req.params.app_name}, function(err, appFound){
    if(!err && appFound){
      var deploy_to = appFound['clientele'].shift()
      var loc = deploy_to['host']+':'+deploy_to['port']
      Client.update({_id: deploy_to._id}, {$set: { busy: true } }, function(err, client){
        res.redirect('/client/'+loc)
      })
    }
    else{
      console.error(err)
    }
  })
})

app.get('/client/:loc', function(req, res){
  console.log(req.params.loc)
  res.redirect("http://www.google.com")
})

function resRedirect(res, loc){
  res.redirect(302, loc)
}



var io    = require('socket.io')(3005);
//var clientPort = 3001;

io.on('connection', function(socket) {
  var address = socket.handshake.address
  //console.log(socket)
  console.log('a client connectted: ' + address + ":" + client_port);

  makeClient(address, client_port)

  socket.on(''+address, function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
    io.emit('127.0.0.1', "Central Server", "Sup")
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});