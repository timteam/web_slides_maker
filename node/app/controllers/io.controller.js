/**
 * Created by Admin on 16/12/2016.
 */
module.exports = this;
var SlidModel = require("./../models/slid.model.js");
var io = require('socket.io');
var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);

this.listen = function(server) {
    var socketMap = {};
    var ioServer = io(server);
    var slidIndex = 0;
    var presId = '';
    var play = false;
    var slids = {};
    var timer = null;
    ioServer.on('connection', function(socket) {
        socket.emit('connection');
        socket.on('data_comm', function(data) {
            console.log('received data_comm event');
            socketMap[data] = socket;
        });
        socket.on('slidEvent', function(data) {
            console.log('received slidEvent');
            var cmd = data.CMD;
            var id = (cmd === 'START') ? data.PRES_ID : presId;
            var slidId;
            fs.readFile(path.join(CONFIG.presentationDirectory, id + ".pres.json"), function(err, data) {
                slids = JSON.parse(data.toString()).slidArray;
                if (presId !== id) {
                    slidIndex = 0;
                    presId = id;
                }
                switch (cmd) {
                    //the go to beginning button
                    case 'BEGIN':
                        goToBegin(slids);
                        break;
                    case 'PREV':
                        previous(slids);
                        break;
                        //the play button
                    case 'START':
                        play(slids);
                        break;
                    case 'PAUSE':
                        pause();
                        break;
                    case 'NEXT':
                        next(slids);
                        break;
                    case 'END':
                        goToEnd(slids);
                        break;
                    default:
                        break;
                }
            });

            var goToBegin = function() {
                slidIndex = 0;
                sendNotifications(slids[slidIndex]);
            }
            var previous = function() {
                if (slidIndex > 0) {
                    slidIndex--;
                }
                sendNotifications(slids[slidIndex]);
            }
            var play = function() {
                sendNotifications(slids[slidIndex]);
                timer = setInterval(next, 3000);
            }
            var pause = function() {
              if(timer){
                  clearInterval(timer);
              }
            }
            var next = function() {
                if (slidIndex < slids.length - 1) {
                    slidIndex++;
                }
                sendNotifications(slids[slidIndex]);
            }
            var goToEnd = function() {
                slidIndex = slids.length - 1;
                sendNotifications(slids[slidIndex]);
            }
            var sendNotifications = function(slid) {
                slid.src = "/slid/" + id;
                for (var key in socketMap) {
                    if (socketMap.hasOwnProperty(key)) {
                        socketMap[key].emit('currentSlidEvent', slid);
                    }
                }
            }
        });
    });
}
