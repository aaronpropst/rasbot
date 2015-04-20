var socketServer = require('http').createServer(function(req,res){}),
	io = require('socket.io').listen(socketServer),
	config = require('./appconfig'),
    Controller = require("./controller"),
    Webserver = require('./webServer');


var ws = new Webserver(config);
var controller = new Controller(config);

socketServer.listen(config.socketServerPort);


var cmdQueue = [];

(function gogo(){
    var thing = cmdQueue.shift();
    if (thing) controller[thing]();
    setTimeout(gogo, 200);
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