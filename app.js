var socketServer = require('http').createServer(function(req,res){}),
	io = require('socket.io').listen(socketServer),
	config = require('./appconfig'),
    Controller = require("./controller"),
    Webserver = require('./webServer');

console.log('UI http Server Init');
var ws = new Webserver(config);
console.log('Controller Init');
var controller = new Controller(config);
console.log('Socket Server Init');
socketServer.listen(config.socketServerPort);


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
	socket.on('downEvent', function (data) {
		console.log(data);
        cmdQueue.push(data.obj);
		//controller[data.obj]();
	});
	socket.on('upEvent', function (data) {
		console.log(data);
        cmdQueue.push('stop');
        //controller['stop']();
	});
});