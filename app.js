var socketServer = require('http').createServer(function(req,res){}),
	io = require('socket.io').listen(socketServer),
	os = require('os'),
    say = require('say'),
    play = require('play'),
	config = require('./appconfig'),
    Controller = require("./controller"),
    Webserver = require('./webServer');

console.log('UI http Server Init');
var ws = new Webserver(config);
console.log('Controller Init');
var controller = new Controller(config);
console.log('Socket Server Init');
socketServer.listen(config.socketServerPort);

if (process.argv[2] != 'mock')
    say.speak(null, 'ras bought online, eye pee address is: '+ os.networkInterfaces().wlan0[0].address);


var cmdQueue = [];

(function processQueue(){
    if (cmdQueue.length > 4){
        controller['stop']();
        cmdQueue = [];
        console.log('declared queue bankruptcy');
    }else{
        var thing = cmdQueue.shift();
        if (thing) controller[thing]();
    }
    setTimeout(processQueue, 200);
})();

io.sockets.on('connection', function (socket) {

	say.speak(null, 'player connected');

	socket.on('downEvent', function (data) {
		console.log(data);
        	cmdQueue.push(data.obj);
	});
	socket.on('upEvent', function (data) {
		console.log(data);
        	cmdQueue.push('stop');
	});

	socket.on('sayEvent', function (data) {
		console.log(data);
		say.speak(null, data.message);
	});

    socket.on('sound', function(data){
        console.log(data);
        play.sound(__dirname + '/sounds/' + data.file);
    });

	socket.on('disconnect', function(){
		say.speak(null, 'player disconnected');
	});

});
