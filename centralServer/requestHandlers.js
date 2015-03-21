var querystring = require("querystring");
var	fs = require("fs");
var	formidable = require("formidable");
var sys = require('sys')


head	='<html>'
body	='<body>Hi, this is the Main Server; not connected</body>'
end		='</html>'

function start(res, postData) {
	console.log("Request handler 'start' was called.");

  res.writeHead(200, {'Content-Type': 'text/html'});
  var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'+
		'</body>'+
		'</html>'
	res.write(body)
  res.end();
}

function upload(res, postData) {
	console.log("Request handler 'upload' was called.");
	
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("You've sent the text: "+
	querystring.parse(postData).text);
	console.log(querystring.parse(postData))
	res.end();
}
function show(response, postData) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;


