
var net = require('net');
var fs = require('fs');
var http = require('http');

var HOST ='127.0.0.1';
var PORT = 3000;
//port of the sockets


body='<html><body>Hi this is the little server.'
+' Still waiting for page from central Server </body></html>'

http.createServer( function(request, response) {
	
	response.writeHead(200,{"Content-Type":"text/html"});
	//need to go 
	response.write(body);
	response.end();
}).listen(8000);
//where you go to see the page
/**/



var client = new net.Socket();
client.connect(PORT, HOST, function() {

	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	client.write('I am Chuck Norris!');

	//client.read(something)
	//client.write(/index.html);
});

client.on('data', function(data) {
	console.log('DATA: ' + data);
	client.destroy();

});

client.on('close',function() {
	console.log('Connection closed');
});