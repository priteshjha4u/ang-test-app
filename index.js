var express = require('express');
var path = require('path');
var app = express();

//routing for public content;
app.use('/', express.static(__dirname + '/public'));

//need to configure dev environment;
if(process.evn=='dev'){
    
}

//need to configure dev production;
if(process.evn=='prod'){
    
}

//registering port;
app.listen(3030,function(){
    console.log('listening port 3030');
});
