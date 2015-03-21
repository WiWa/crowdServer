var http = require("http");
var url = require("url")

function start()
{
	function onRequest(request, response)
	{
		response.write("SSN and Credit Card #: ");
		response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;