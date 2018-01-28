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
		
		//kaInterval = setInterval(rasbot.kaTick,500);
		
		socket.on('connect', function(data){
			console.log('connected to socket');
            $("#status").text("Connected...");
            $("#status").toggleClass("good", true);
		});
		
		
		socket.on('connect_failed', function (data) {
			console.log('socket connect failed');
			console.log(data);
            $("#status").text("Socket Failed...");
            $("#status").toggleClass("good", false);
		});
        socket.on('disconnect', function (data) {
            console.log('socket disconnect');
            console.log(data);
            $("#status").text("Socket Disconnected...");
            $("#status").toggleClass("good", false);
        });

		socket.on('error', function (data) {
			console.log('socket error');
			console.log(data);
            $("#status").text("Socket Error...");
            $("#status").toggleClass("good", false);
		});
		
		
		//$('#main a').bind('tap', tapHandler);//.on('click', fsb.tapHandler);
		$('#main a').bind('vmousedown', function(e){
			e.preventDefault();
			keepalive = true; 
			socket.emit('downEvent', { obj: e.currentTarget.id });
			console.log('tapdown');
            $(e.currentTarget).toggleClass("active",true);
		});//.on('click', fsb.tapHandler);
		$('#main a').bind('vmouseup', function(e){
			e.preventDefault();
			keepalive = false;
			socket.emit('upEvent', { obj: e.currentTarget.id });
			console.log('tapup');
            $(e.currentTarget).toggleClass("active",false);
		});//.on('click', fsb.tapHandler);

        $('#speech').bind('keypress', function(e){
            if(e.keyCode==13){
                socket.emit('sayEvent', { message: e.currentTarget.value });
                e.currentTarget.value='';
            }
        });


        $.get("/sounds", function(data, status){
            data.forEach(function(d){
                console.log(d);
                $('#sounds').append('<a href="javascript:;">' + d + '</a>');
            });


            $('#sounds a').bind('vmousedown', function(e){
                e.preventDefault();
                keepalive = true;
                socket.emit('sound', { file: $(e.currentTarget).text() });
                $(e.currentTarget).toggleClass("active",true);
                console.log($(e.currentTarget).text());
            });
            $('#sounds a').bind('vmouseup', function(e){
                e.preventDefault();
                keepalive = false;
                //socket.emit('upEvent', { obj: e.currentTarget.id });
                $(e.currentTarget).toggleClass("active",false);
            });

        });


            $('#shutdownDiv #shutdown').bind('vmousedown', function(e){
                e.preventDefault();
                keepalive = true;
                socket.emit('shutdownEvent', { });
                //$(e.currentTarget).toggleClass("active",true);
                console.log($(e.currentTarget).text());
            });


        console.log('fsb.init...');
	};

	
	// Public
	return { 
		socket: function(){ return socket },
		url: url,
		//kaTick: kaTick,
		init: init
	};

} (jQuery));
