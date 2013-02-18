//to run: start mongod, run ../streamFromDb.js
var http = require('http');
var help = require('../helper.js');
var server = require('../streamFromDb.js');
var expect = require('expect.js');

describe('Testing part 5', function(){
         var options = {
         hostname: '127.0.0.1',
         port: 8080,
         path: '/',
         method: 'GET'
         };
         var str;
         var arr;
         var t;
         var count=0;
         var numArgsGood = 1;
         var nameGood = 1;
         var emailGood = 1;
         var badEmails = new Array();
         // Get a response from the server
	 // and check the values 
         before(function(done){
	     var req = http.get(options, function(res){
                res.on('data', function(chunk){
                       //get rid of the new line
                    str = chunk.toString().trim();
                    arr = str.split(',');
                    if(arr.length!=2)
                    {
			console.log(arr);
                        numArgsGood = 0;
                    }
                    if(arr[0].length <1)
                    {
                        nameGood = 0;
                    }
                    t = help.isValidEmail(arr[1]);
                    if(!t)
                    {
                        emailGood = 0;
                        badEmails.push(arr[1]);
                    }
                    if(numArgsGood && nameGood & emailGood)
		    {
                       	count++;
                    }
                });
                res.on('end', function(){
                       done();
                });
	    });
	});
        
        it('should have 10K records',function(done){
            expect(count).to.be(10000);
            done();
        });
        it('should have all good emails',function(done){
            expect(emailGood).to.be(1);
            done();
        });
        it('should have no bad emails', function(done){
            expect(badEmails.length).to.be(0);
            done();
        });
        it('should have all good names',function(done){
            expect(nameGood).to.be(1);
            done();
        });
        it('each record should have 2 parts',function(done){
            expect(numArgsGood).to.be(1);
            done();
        });

        after(function(done){
            delete badEmails;
            done();
        });

});
