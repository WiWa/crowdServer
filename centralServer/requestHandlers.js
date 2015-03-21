var querystring = require("querystring");
	fs = require("fs");
	formidable = require("formidable");


head	='<html>'
body	='<body>Hi, this is the Main Server; not connected</body>'
end		='</html>'

function start(response) {
	console.log("Request handler 'start' was called.");

var button = '<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+'<form action="/upload" enctype = "multipart/form-data" '+
	'method="post">'+
	'<input type="file" name = "upload">'+
	'<input type="submit" value = "Upload file"/>' +
	'</form>';
	'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Submit text" />'
	displayed=head+button+body+end;
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(displayed);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	console.log("abotut to parse");
	
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
	
		fs.rename(files.upload.path, "./tmp/littleIndex.html", function(error) {
			if (error) {
				fs.unlink("./tmp/littleIndex.html");
				fs.rename(files.upload.path, "/tmp/littleIndex.html");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received html");
		//response.write("<img src='/show' />");
		response.write("You've sent "+
		querystring.parse(request).text);
		response.end();
	});
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


