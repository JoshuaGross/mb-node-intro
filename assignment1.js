var express = require('express');
var timer = require('timers');
var help = require('./helper.js');
var app = module.exports =  express();

//no configuration really need at this point
//route for http://localhost:8080	
app.get('/hello', function(req, response){
	var msg = 'world';
	//from helper.js
	help.slowSend( response, msg,200);
});

//route for /world
app.get('/world', function(req, response){
	var msg = 'hello';
	help.slowSend(response,msg,200);
});

//if no other route is found, send 404 not found 
app.get('*', function(req, response){
	var msg = '404 File not found';
	help.slowSend(response,msg,404);
});
//listen defaults to localhost, I chose port 8080
app.listen(8080);
