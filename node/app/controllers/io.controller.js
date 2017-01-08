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
    var prevData = '';
    ioServer.on('connection', function(socket) {
        socket.emit('connection');
        socket.on('data_comm', function(data) {
            console.log('received data_comm event');
            socketMap[data] = socket;
            if (prevData !== '') {
                socket.emit('currentSlidEvent', prevData);
            }
        });
        socket.on('slidEvent', function(data) {
            console.log('received slidEvent');
            var cmd = data.CMD;
            var id = (cmd === 'START') ? data.PRES_ID : presId;
            var slidId;
            fs.readFile(path.join(CONFIG.presentationDirectory, id + ".pres.json"), function(err, data) {
                var slids = JSON.parse(data.toString()).slidArray;
                if (presId !== id) {
                    slidIndex = 0;
                    presId = id;
                }
                switch (cmd) {
                    //the play button
                    case 'START':
                        slidIndex = 0;
                        break;
                    case 'END':
                        slidIndex = slids.length - 1;
                        break;
                        //the go to beginning button
                    case 'BEGIN':
                        slidIndex = 0;
                        break;
                    case 'PREV':
                        if (slidIndex > 0) {
                            slidIndex--;
                        }
                        break;
                    case 'NEXT':
                        if (slidIndex < slids.length - 1) {
                            slidIndex++;
                        }
                        break;
                    case 'PAUSE':
                        break;
                    default:
                        break;
                }
                var data = slids[slidIndex];
                data.src = "/slid/" + id;
                for (var key in socketMap) {
                    if (socketMap.hasOwnProperty(key)) {
                        prevData = data;
                        socketMap[key].emit('currentSlidEvent', data);
                    }
                }
            });

        });
    });
}
