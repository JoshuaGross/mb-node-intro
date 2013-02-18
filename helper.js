//a helper function to send a response after 1000ms
//@params res, a response event passed in from a server
//	  message, the message to send the response
//	  code, the return code to send the client
//@returns nothing, just sends a request
exports.slowSend = function(res,message,code,time){
		setTimeout(function(){
			res.setHeader('Content-Type', 'text/plain');
			res.setHeader('Content-Length', message.length);
			res.send(code,message);	
			res.end();
		},time);
}
//a helper function to test if the string is a 
//valid email in the form [sub].local@[subdomain].domain,
//where the bracketed parts are optional
exports.isValidEmail = function(email){
	if(!email){
		return false;
	}
	var str = email.toString();
	var atChar = str.split("@");
	//only 1 @ is possible at this time
	if(atChar.length != 2){
		return false;
	}
	var before = atChar[0];
	var after = atChar[1];
	//each part must have at least 1 character
	if(before.length == 0 || after.length == 0){
		return false;
	}
	//check the domain (the wisc in wisc.edu is technically legal)
	var after2 = after.split(".");
	var quit = true;
	var permissible = new Array("edu","com","net","org","io");
	if(after2.length != 2){
		if(after2.length >2||after2.length==0){	
			return false;
		}
		var j;
		for(j=0;j<permissible.length;j++){
			if(permissible[j] == after2[0]){
				var quit = false;
				break;
			}
		}
		if(quit){
			return false;
		}
		return true;
		
	}
	var i=0;
	for(i=0;i<permissible.length;i++){
		if(permissible[i].toString() == after2[1].toString()){
			return true;
		}
	}
	return false;
	


}
