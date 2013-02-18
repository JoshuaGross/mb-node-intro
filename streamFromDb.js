var mongoose = require('mongoose');
var http = require('http');
//retrieve the schema for user
mongoose.connect('localhost', 'test');
var db = mongoose.connection;
var user = mongoose.Schema({
	name: String,
    	email: String
});

//on a request, get a stream to the database
//Then write to response, end when the stream is closed
//The server is still running after it is printed
var User = mongoose.model('User', user,'user');

var serv = module.exports = http.createServer(function(req,res){
	var stream = User.find().stream();

	stream.on('data', function(doc){	
		res.write(doc['name']+','+doc['email']+'\n');
	}).on('error', function(err){
		console.log(err);
	}).on('close', function(){
		//send no data on end
		res.end();
	});
	
}).listen(8080);

