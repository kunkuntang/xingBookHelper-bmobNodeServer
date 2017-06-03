
/*
 * GET home page.
 */

// var BC = require('../lib/bmobcloud');
var BC = require('bmob');


var express = require('express');
var router = express.Router();

BC.initialize('6636a71c682fc816bf7f4d3678561cff', '05ea04f70d33f065e52ded897c5f4765');
// var modules = BC.getModules(BC);

router.post('/', function(request, response) {

	var name = request.body._e;
	require('./function_'+name);
  	/*
	调用方式:
	curl -X POST -d '_e=findone&objectId=7bf254c044' http://127.0.0.1:80
	curl -X POST -d '_e=testfunction' http://127.0.0.1:80
	curl -X POST -d '_e=test' http://127.0.0.1:80
  	*/
  	// console.log("http body %v", request.body);
	var funcName = BC.Function.func(name);
	if (typeof(funcName) == 'undefined') {
		
		response.send('post function '+request.body._e+' not exists');
		return ;
	}
	funcName(request,response);

});

router.get('/:functions', function(request, response) {

	var data  = request.params;
	var name = data.functions;
	require('./function_'+name);
  	/*
	调用方式:
	curl -X GET http://127.0.0.1:80/findget
	curl -X GET http://127.0.0.1:80/findoneget?objectId=423ffdcb9b
	curl -X GET http://127.0.0.1:80/test
  	*/
	var funcName = BC.Function.func(name);
	console.log(funcName)
	if (typeof(funcName) == 'undefined') {
		response.send('get function '+data.functions+' not exists');
		return ;
	}
	funcName(request,response);

});

router.post('/:functions', function(request, response) {

	var data  = request.params;
	var name = data.functions;
	require('./function_'+name);
  	/*
	调用方式:
	curl -X POST -d 'objectId=7bf254c044' http://127.0.0.1:80/test
  	*/
	var funcName = BC.Function.func(name);
	if (typeof(funcName) == 'undefined') {
		response.send('get function '+data.functions+' not exists');
		return ;
	}
	funcName(request,response,modules);

});

module.exports = router;
