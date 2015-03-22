var express=require("express") 
var multer  = require('multer') 
var externalip = require('externalip')
var app = module.exports = express() 
var fs = require('fs')
var http = require('http')
var request = require('request')
var extract_deploy = require('./deploy.js').extract_deploy
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

  socket.on('127.0.0.1', function(from, msg){
    if(typeof msg != String && msg[0] == 'deploy'){
      //socket.emit(''+'127.0.0.1', ip, ['download', msg[1]])
      downloadByGet(msg[1], socket.id, msg[2])
    }
    console.log("Reply Received from " + from + " saying " + msg)
  })

});

function downloadByGet(app_name, socket, indexfile){
  var filename = app_name+'.tar.gz'
  var filestream = fs.createWriteStream(filename)
  request.get('http://127.0.0.1:3000/'+app_name+'/'+socket).pipe(filestream)
  filestream.on('close', function(){
    console.log('Download Finished, Extracting, Deploying...')
    extract_deploy(filename, app_name, indexfile)
  })
}

