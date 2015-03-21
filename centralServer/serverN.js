
var net = require('net');
var fs = require('fs');

var HOST ='127.0.0.1';
var PORT = 3000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	client.write('I am Chuck Norris!');
	//client.write(/index.html);
});

client.on('data', function(data) {
	console.log('DATA: ' + data);
	client.destroy();

});

client.on('close',function() {
	console.log('Connection closed');
});