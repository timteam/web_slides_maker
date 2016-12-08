'use strict';
console.log( 'It Works!' );

// app.js
var http = require( 'http' );
var CONFIG = require( './config.json' );
var path = require( 'path' );
process.env.CONFIG = JSON.stringify( CONFIG );


// init server
var express = require( 'express' );
var app = express();
var defaultRoute = require( './app/routes/default.route.js' );
var utils = require( './app/utils/utils.js' );
app.use( defaultRoute );
var server = http.createServer( app );
server.listen( CONFIG.port );
app.use( '/admin', express.static( path.join( __dirname, 'public/admin' ) ) );
app.use( '/watch', express.static( path.join( __dirname, 'public/watch' ) ) );

app.get( "/loadPres", function ( request, response ) {
  var fs = require( 'fs' );
  utils.parseJsonFilesFromDirectoryPath( CONFIG.presentationDirectory, (
    err
    , parsedJsonArray ) => {
    if ( err ) {
      return;
    }
    console.log( parsedJsonArray );
    var mappedPresentationArray = parsedJsonArray.map( ( obj ) => {
      var rObj = {};
      rObj[ obj.id ] = obj;
      return rObj;
    } );
    response.send( JSON.stringify( mappedPresentationArray ) );
  } );
} );

app.get( "/savePres", function ( request, response ) {
  response.send( "Presentation saved" );
} );
