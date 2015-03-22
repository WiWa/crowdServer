//var http = require('http')
//var fs = require('fs')
var tarball = require('tarball-extract')
var exec = require('child_process').exec

function extract_deploy(tgz, appName, indexfile){
  tarball.extractTarball(tgz, 'extracted', function (err){
    if(err){
      console.log(err)
    }
    else{
      var content = 'empty'
      exec('node extracted/'+appName+'/'+indexfile, function(error, stdout, stderr){
        content = stdout
        console.log(stdout)
      })
      console.log("Maybe Deploying?")
      return content
    }
  }) 
}
  
exports.extract_deploy = extract_deploy