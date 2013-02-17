//load 10k files to a mongoDb database
var mongoose = require('mongoose');
var async = require('async');

//mongoose.connect('mongodb://localhost/test');
mongoose.connect('localhost', 'test');
db = mongoose.connection;

//define the user schema
var user = mongoose.Schema({
	name: String,
    	email: String
});

//Create a User model in the test database
//
var User = mongoose.model('User', user,'user');
db.on('error', console.error.bind(console, 'connection error:'));

//for 10k times, create a new item, give it a name
//and an email and save it
//when it is over, close the database
async.times(10000, function(n, callback){
	var item = new User;
	item.name = 'user'+n;
	item.email = item.name+'@fakemail.com';
	item.save();
	callback();
}, function(err){
	if(err) console.log(err)
	db.close();

});
