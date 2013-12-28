var express = require("express"),
	app = express(),
	io = require('socket.io').listen(8083);
//	io = require('socket.io').listen(app);
	
var RaspiCam = require("raspicam");

var camera = new RaspiCam({ 
	mode: 'timelapse',
	output: '/var/www/still.jpg',
	timelapse: 1000,
	//nopreview: 1
	timeout: 1000,
	quality: 30
	//exposure: 'verylong',
});
	


app.listen(8082);

app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function (socket) {
	var lastReadTime = 0;
	var readDebounceTimeout = 500;

	//var process_id = camera.start();

	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
	
	socket.on('disconnect', function(){
		//camera.stop(process_id);
	});
	
	socket.on('snap', function (data){
		//to take a snapshot, start a timelapse or video recording
		//var process_id = camera.start();
		//to stop a timelapse or video recording
		//camera.stop( process_id );
	});	

	camera.on('exit', function(data){
		console.log('RASPI EXIT EVENT');
		console.log(data);
	});

	camera.on('read', function(data){
		console.log('raspiRead! ' + (new Date().getTime()) + ' ' + lastReadTime);
		if ((new Date().getTime()) - lastReadTime > 500){
			debouncedRead();			
	
			lastReadTime = new Date().getTime();
		}


	});
	
	var debouncedRead = function(){
		socket.emit('news', { 'status': 'raspicamDone' });
	};
	
});




