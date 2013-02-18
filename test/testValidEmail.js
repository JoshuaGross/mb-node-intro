var help = require('../helper.js');
var expect = require('expect.js');
var goodEmail = 'mbeaty@wisc.edu';
var badEmail = 'mbeaty';

describe('Testing email validator', function(){
	var s;
	it('Should accept good email', function(done){
		s = help.isValidEmail(goodEmail);
		expect(s).to.be.ok();
		done();
	});
	it('Should accept . in local', function(done){
		s = help.isValidEmail('matt.beaty@fakemail.com');
		expect(s).to.be.ok();
		done();
	});
	it('Should allow top level only domains', function(done){
		s = help.isValidEmail('super@com');
		expect(s).to.be.ok();
		s= help.isValidEmail('super@edu');
		expect(s).to.be.ok();
		done();
		
	});
	it('Should not accept just a name', function(done){
		s = help.isValidEmail(badEmail);
		expect(s).to.not.be.ok();
		done();
	});
	it('Should not accept emails without domain', function(done){
		s = help.isValidEmail('johnbon@wisc');
		expect(s).to.not.be.ok();
		done();
	});
	it('Should not accept emails without a local part', function(done){
		s = help.isValidEmail('@wisc.edu');
		expect(s).to.not.be.ok();
		done();
	});


});
