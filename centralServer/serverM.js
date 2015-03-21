
//used to interact with uploading
var querystring = require ('querystring');
var	fs = require('fs');
var	formidable = require ('formidable');

//to connect with sockets and see webpage
var net = require('net');
var http = require('http');

//port number
var HOST = '127.0.0.1';
var PORT = 3000;

head	='<html>'
body	='<body>Hi, this is the Main Server; not connected</body>'
end		='</html>'
http.createServer( function(request, response) {
	
	var button = '<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+'<form action="/upload" enctype = "multipart/form-data" '+
	'method="post">'+
	'<input type="file" name = "upload">'+
	'<input type="submit" value = "Upload file"/>' +
	'</form>';
	/*'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Submit text" />'*/
	displayed=head+button+body+end;
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