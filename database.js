var mongoose = require(‘mongoose’);
mongoose.connect(‘mongo db://localhost/test’); //pending connection to test database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
}); //test if connection is successful
var clientSchema = mongoose.Schema({
	host: String,
	port: String,
	busy: Boolean
}; //reference to a Schema and definition of client
var Client = mongoose.model(‘Client’, clientSchema); //compile Schema into a model
var host = “”; //TBD
var port = “”; //TBD
var client1 = new Client({host: host, port: port, busy: false});
client1.save(function(err, client1) {
	if(err) return console.error(err);
}); //save to database
var appSchema = mongoose.Schema({
	name: String,
	clientele: Array
}); //Reference to a Schema and definition of app
var App = mongoose.model(‘App, appSchema); //compile Schema into a model
var name = “”; //TBD
var clientele = []; //will represent array of clients that have been delegated the app	
var appFound = App.findOne({name: name}, function(err, name of app variable) {}); 
//find app in database; if not found, create new app object and save to database
if(appFound == null) {
		var app1 = new App({name: name, clientele: clientele});
		app1.save(function(err, app1) {
			if(err) return console.error(err);
}); 
}
clientele[0] = Client.findOne({busy: false}, function(err, clients) {}); //find all clients that are not busy

