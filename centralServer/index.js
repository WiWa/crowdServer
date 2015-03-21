var server = require("./server");
var client = require("./clients");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};  // handle is an object whose fields are different URLs holding different
          // corresponding handling functions
          // i.e. a collection of functions
handle["/"] = requestHandlers.start;    
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload; 
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);