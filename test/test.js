//dependencies
var expect = require('expect.js');
var http = require('http');

//launch the express app
var app = require('../assignment1');

describe('Codes result for request',function(){	

	//options to pass to get requests
	var options = {
		hostname: '127.0.0.1',
		port: 8080,
		path: '/hello',
		method: 'GET'
	};
	//set up variables to check
	var expectedValue = 200;
	var expectedBody = 'world';

	it('/hello should have 200 return code', function(done){
		var req = http.get(options, function(res){
			expect(res.statusCode).to.be(expectedValue);
			expect(res.statusCode).to.not.be(404);
			//don't forget to call done()
			done();
				
		});	
	});
	it('/hello should say "world"', function(done){
		var req = http.get(options, function(res){
			res.on('data', function(chunk){
				expect(chunk.toString()).to.not.be('hello');
				expect(chunk.toString()).to.be(expectedBody);
				done();
			});
		
		});
	});
	it('/world should have 200 return code', function(done){
		options['path'] = '/world';
		expectedValue = 200;
		var req = http.get(options, function(res){
			expect(res.statusCode).to.be(expectedValue);
			expect(res.statusCode).to.not.be(404);
			done();	
		});
	});
	it('/world should say "hello"', function(done){
		expectedBody = 'hello';
		var req = http.get(options, function(res){
			res.on('data',function(chunk){
				expect(chunk.toString()).to.be(expectedBody);
				expect(chunk.toString()).to.not.be('world');
				done();
			});
		});
	});


	it('any other path should have 404 return code', function(done){
		options['path'] = '/';
		expectedValue = 404;
		var req = http.get(options,function(res){
			expect(res.statusCode).to.be(expectedValue);
			expect(res.statusCode).to.not.be(200);
		});
		options['path'] = '/body';
		req = http.get(options,function(res){
			expect(res.statusCode).to.be(expectedValue);
			expect(res.statusCode).to.not.be(200);
		});
		
		done();
	});
	
	it('any other path should say "404 File not found"', function(done){
		expectedBody = '404 File not found';
		//testing on '/body'
		var req = http.get(options, function(res){
			res.on('data', function(chunk){
				expect(chunk.toString()).to.be(expectedBody);
			});
		});
		options['path'] = '/';
		req = http.get(options, function(res){
			res.on('data', function(chunk){
				expect(chunk.toString()).to.be(expectedBody);
			});
		});
		done();
	});
});
