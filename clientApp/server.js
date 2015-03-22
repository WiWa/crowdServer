var express=require("express") 
var multer  = require('multer') 
var externalip = require('externalip')
var app = module.exports = express() 
var fs = require('fs')
var done=false 

/*Run the server.*/
app.listen(4000,function(){
    console.log("Peer working on port 4000") 
}) 



externalip(function (err, ip){
  var io = require('socket.io-client');
  var socket = io.connect('http://localhost:3005'); 

  socket.on('connect',function(){
    socket.emit(''+'127.0.0.1', ip, 'Hello World');
  })

  socket.on('127.0.0.1', function(){
    console.log("Reply Received")
  })

});

