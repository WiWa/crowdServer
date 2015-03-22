var express=require("express") 
var multer  = require('multer') 
var app = module.exports = express() 
var fs = require('fs')
var done=false 

/*Run the server.*/
app.listen(4000,function(){
    console.log("Peer working on port 4000") 
}) 

