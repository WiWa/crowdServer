var express=require("express");
var multer  = require('multer');
var app = module.exports = express();
var done=false;

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

/*Handling routes.*/
require('./router.js');

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});
