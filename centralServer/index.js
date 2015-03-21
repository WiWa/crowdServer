
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



var server = require("./serverM");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
