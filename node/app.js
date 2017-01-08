'use strict';
console.log( 'It Works!' );

// app.js
var http = require( 'http' );
var CONFIG = require( './config.json' );
var path = require( 'path' );
process.env.CONFIG = JSON.stringify( CONFIG );
const fs = require('fs');
var bodyParser = require('body-parser')

// init server
var express = require( 'express' );
var app = express();
var defaultRoute = require( './app/routes/default.route.js' );
var utils = require( './app/utils/utils.js' );
app.use( defaultRoute );
var server = http.createServer( app );

app.use( '/admin', express.static( path.join( __dirname, 'public/admin' ) ) );
app.use( '/watch', express.static( path.join( __dirname, 'public/watch' ) ) );
app.use( '/login', express.static( path.join( __dirname, 'public/login' ) ) );

// Controller
var SlidController = require('./app/routes/slid.route.js');
app.use( SlidController );

// controller socket io
var IOController = require("./app/controllers/io.controller.js");
IOController.listen(server);

app.use("/loadPres", function(request, response, cb) {
    var dir = CONFIG.presentationDirectory;
    var extension = "json";
    var presentationList = {};

    fs.readdir(dir, function(err, files)  {
        var i = 0;
        var presLabel = "pres"
        files.forEach(function(file) {
            if(path.extname(file) === "." + extension){
                i++;
                var contents = fs.readFileSync(path.join(dir, file));
                var parsedFile = JSON.parse(contents);
                presentationList[presLabel + i+ "." + parsedFile.id ] = parsedFile;
            }
            if( i == files.length){
                response.end(JSON.stringify(presentationList));
            }
        });
        if (err) {
            return console.log(err);
        }
    });

});



// Body
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.use("/savePres", function(request, response) {
    var contents = request.body;
    var dir = CONFIG.presentationDirectory;

    console.log("content: "+contents);
    var savedName = path.join(dir, contents.id + ".pres.json");
    console.log("body: "+request.body);
    console.log("content.id: "+contents.id);
    console.log(savedName);

    fs.writeFile(path.join(CONFIG.presentationDirectory, contents.id+".pres.json"), JSON.stringify(contents), "utf8", response.end());
});


server.listen( CONFIG.port );
