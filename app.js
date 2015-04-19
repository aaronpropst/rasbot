var express = require("express"),
    bodyParser = require('body-parser'),
	webserver = express(),
	socketServer = require('http').createServer(handler),
	io = require('socket.io').listen(socketServer),
	fs = require('fs'),
	config = require('./appconfig'),
	rr = require("raspirobot"),
	robot;

if (typeof config.mockBot !== 'undefined'){
	robot = config.mockBot;
}else{
	robot = new rr.RaspiRobot();
}

robot.setup();

//sockets
socketServer.listen(config.socketServerPort);
//express / html
webserver.listen(config.webServerPort);


webserver.use(bodyParser.urlencoded({extended: true}));

//I don't honestly know why I need one of these..  TODO: look that up.
var handler = function(req, res){};

//ROUTING:  set up routes for the paths we want public.
webserver.get("/", function(req, res){
	res.render(__dirname + '/views/index.ejs', {
 		cacheKey: '?t=' + (new Date()).getTime()
	});
});
	
webserver.use('/config', express.static(__dirname + '/config'));
webserver.use('/content', express.static(__dirname + '/content'));
webserver.use('/static', express.static(__dirname + '/static'));
webserver.use('/socket.io/', express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/'));



io.sockets.on('connection', function (socket) {


	socket.emit('news', { hello: 'world' });

	socket.on('downEvent', function (data) {
		console.log(data);
		controls[data.obj]();
	});
	socket.on('upEvent', function (data) {
		console.log(data);
		robot.setMotor('left', 0);
		robot.setMotor('right', 0);
	});
	//socket.on('keepAlive', function (data) {
	//	console.log(data);
	//});
	
	
	
	
	
});

var controls = {
	forward: function(){
		robot.setMotor('left', 1, 1);
		robot.setMotor('right', 1, 1);
	},
	back: function(){
		robot.setMotor('left', 1, 0);
		robot.setMotor('right', 1, 0);
	},
	left: function(){
		robot.setMotor('left', 1, 0);
		robot.setMotor('right', 1, 1);
	},
	right: function(){
		robot.setMotor('left', 1, 1);
		robot.setMotor('right', 1, 0);
	}
};


