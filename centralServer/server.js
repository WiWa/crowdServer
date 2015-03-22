var express=require("express") 
var multer  = require('multer') 
var app = module.exports = express() 
var done=false 

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
function makeClient(host, port) {
	var client1 = new Client({host: host, port: port, busy: false})
	client1.save(function(err) {
		if(err) return console.error(err)
	}) //save to database
}

makeClient("1.1.1.1", "9000")
Client.findOne({busy:false}, function(err, ret){console.log(ret)})
//console.log(ret)

var appSchema = mongoose.Schema({
	name: String,
	clientele: Array
})  //Reference to a Schema and definition of app
var App = mongoose.model('App', appSchema)  //compile Schema into a model
function makeApp() {
  var name = "" //TBD
  var clientele = [] //will represent array of clients that have been delegated the app	
  App.findOne({name: name}, function(err, appFound) {
    //find app in database  if not found, create new app object and save to database
    if(appFound == null) {
      var app1 = new App({name: name, clientele: clientele}) 
      app1.save(function(err, app1) {
        if(err) return console.error(err)
      })
    }
    Client.findOne({busy: false}, function(err, clients) {
      var clientele[0] = clients[0]
    }) //find all clients that are not busy
  })

}
