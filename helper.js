//a helper function to send a response after 1000ms
//@params res, a response event passed in from a server
//	  message, the message to send the response
//	  code, the return code to send the client
//@returns nothing, just sends a request
//Could modify easily to pass in how long to wait
exports.slowSend = function(res,message,code){
		setTimeout(function(){
			res.setHeader('Content-Type', 'text/plain');
			res.setHeader('Content-Length', message.length);
			res.send(code,message);	
			res.end();
		},1000);
}

