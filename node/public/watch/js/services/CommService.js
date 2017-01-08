angular.module('commServices', []).factory('comm', commFnc);
commFnc.$inject = ['$http', '$q', 'factory'];

function commFnc($http, $q, factory) {
    var comm = {
        loadImages: loadImages,
        loadPres: loadPres,
        savePres: savePres

    };

    function loadImages(presName, presID) {
        var deferred = $q.defer();
        $http.get('/slids').
        then(function(data, status, headers, config) {
            deferred.resolve(data);
        }, function(data, status, headers, config) {
            deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    function loadPres(presName, presID) {
        var deferred = $q.defer();
        $http.get('/loadPres').then(function(data, status, headers, config) {
            deferred.resolve(data);
        }, function(data, status, headers, config) {
            deferred.reject(status);
            // or server returns response with an error status.
        });

        return deferred.promise;
    };

    function savePres(presentation) {
        var deferred = $q.defer();
        //deferred.resolve(JSON.stringify(presentation));
        $http.post('/savePres', presentation).
        then(function(data, status, headers, config) {
            deferred.resolve(data);
        }, function(data, status, headers, config) {
            deferred.reject(status);
        });
        return deferred.promise;
    };

    comm.io = {};
    comm.io.socketConnection = function(scope, uuid) {
        var socket = io.connect();
        comm.io.uuid = uuid;
        socket.on('connection', function() {
            socket.emit('data_comm', {
                'id': comm.io.uuid
            });
        });
        socket.on('newPres', function(socket) {});
        socket.on('slidEvent', function(socket) {});
        return socket;
    }

    comm.io.emitPrev = function(socket) {
        socket.emit('slidEvent', {
            'CMD': "PREV"
        });
    }
    comm.io.emitNext = function(socket) {
        socket.emit('slidEvent', {
            'CMD': "NEXT"
        });
    }
    comm.io.emitStart = function(socket, presUUID) {
        socket.emit('slidEvent', {
            'CMD': "START",
            'PRES_ID': presUUID
        });
    }
    comm.io.emitPause = function(socket) {
        socket.emit('slidEvent', {
            'CMD': "PAUSE"
        });
    }
    comm.io.emitBegin = function(socket) {
        socket.emit('slidEvent', {
            'CMD': "BEGIN"
        });
    }
    comm.io.emitEnd = function(socket) {
        socket.emit('slidEvent', {
            'CMD': "END"
        });
    }
    return comm;
};
