var http = require("http");
var url = require('url')
var multipart = require('multipart');
var sys = require('sys');

function start()
{
	function onRequest(request, response)
	{
		/*response.writeHead(301,{Location: 'http://127.0.0.1:3000'}
		);
		response.end();*/
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write("SSN and Credit Card #: ");
		//response.end();
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	http.createServer(onRequest).listen(8888, '127.0.0.1');
	console.log("Server has started.");
}

exports.start = start;