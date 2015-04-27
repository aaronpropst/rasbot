var express = require("express"),
    bodyParser = require('body-parser'),
    server = express(),
    fs = require('fs');


function Webserver (config){

    //express / html
    server.listen(config.webServerPort);
    server.use(bodyParser.urlencoded({extended: true}));

    //ROUTING:  set up routes for the paths we want public.
    server.get("/", function(req, res){
        res.render(__dirname + '/views/index.ejs', {
            cacheKey: '?t=' + (new Date()).getTime()
        });
    });

    server.use('/config', express.static(__dirname + '/config'));
    server.use('/content', express.static(__dirname + '/content'));
    server.use('/static', express.static(__dirname + '/static'));
    server.use('/socket.io/', express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/'));

    server.get("/sounds", function(req, res){
        fs.readdir(__dirname + '/sounds', function(err, files){
            res.json(files);
        });
    });
}

module.exports = Webserver;
