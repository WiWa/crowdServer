var http = require('http')

function onRequest(req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello World");
  res.end();
}

http.createServer(onRequest).listen(3200, '127.0.0.1')

console.log("Server listening on port 127.0.0.1:3200")
