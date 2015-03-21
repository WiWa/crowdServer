var net = require('net');
var http = require('http');

var HOST = '127.0.0.1';
var PORT = 3000;

body='<html><body>Hi, not connected yet!</body></html>'

http.createServer( function(request, response) {
	
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}).listen(8080);


net.createServer(function(sock) {
    
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        sock.write('You said "' + data + '"');
        //trys to assign data received to body
		body=data;
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);