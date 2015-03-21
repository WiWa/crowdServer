var querystring = require("querystring");
var	fs = require("fs");
var	formidable = require("formidable");


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
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>'
	res.write(body)
  res.end();
}

function upload(res, postData) {
	console.log("Request handler 'upload' was called.");
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + postData);
	console.log(postData)
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	fs.readFile("./tmp/test.png", "binary", function(error, file) {
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


