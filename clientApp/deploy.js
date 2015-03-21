//var http = require('http')
//var fs = require('fs')
var tarball = require('tarball-extract')
var exec = require('child_process').exec

tarball.extractTarball('test.tar.gz', 'test', function (err){
  if(err){
    console.log(err)
  }
  else{
    deployApp()
    console.log("Maybe Deploying?")
  }
})

function deployApp(){
  var content = 'empty'
  exec('node test/cstest/server', function(error, stdout, stderr){
    content = stdout
    console.log(stdout)
  })
  return content
}