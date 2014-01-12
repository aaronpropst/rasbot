

rasbot = (function ($) {
	"use strict";

	var socket;
	var keepalive = false;
	var kaInterval;
	
	var url = function (){
		return $.url().param();
	};
	
	var init = function(){
		
		socket = io.connect('http://' + document.location.hostname + ':8082');
		
		kaInterval = setInterval(rasbot.kaTick,500);
		
		socket.on('connect', function(data){
			console.log('connected to socket');
			
		});
		
		
		socket.on('connect_failed', function (data) {
			console.log('socket connect failed');
			console.log(data);
		});
		
		socket.on('error', function (data) {
			console.log('socket error');
			console.log(data);
		});
		
		
		//$('#main a').bind('tap', tapHandler);//.on('click', fsb.tapHandler);
		$('#main a').bind('vmousedown', function(e){
			e.preventDefault();
			keepalive = true; 
			socket.emit('downEvent', { obj: e.currentTarget.id });
			console.log('tapdown');
		});//.on('click', fsb.tapHandler);
		$('#main a').bind('vmouseup', function(e){
			e.preventDefault();
			keepalive = false;
			socket.emit('upEvent', { obj: e.currentTarget.id });
			console.log('tapup');
		});//.on('click', fsb.tapHandler);


		console.log('fsb.init...');
	};
	
	var kaTick = function(){
		if (keepalive){
			socket.emit('keepAlive', {});
			console.log('ka - on');
		}
	};
	
	// Public
	return { 
		socket: function(){ return socket },
		url: url,
		kaTick: kaTick,
		init: init
	};

} (jQuery));

