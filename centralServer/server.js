var http = require("http");
var url = require("url")

function start()
{
	function onRequest(request, response)
	{
		/*response.writeHead(301,{Location: 'http://127.0.0.1:3000'}
		);
		response.end();*/
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("SSN and Credit Card #: ");
		response.end();
	}
	http.createServer(onRequest).listen(8888, '127.0.0.1');
	console.log("Server has started.");
}

exports.start = start;