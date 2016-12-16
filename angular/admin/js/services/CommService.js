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
        //var contentMap = {"key1":"value1","key2":"value2"};
        var contentMap = {};
        setInterval(function() {
            for (var i = 0; i < 10; i++) {
                var content = factory.contentCreation('Title ' + i, 'type ' + i + 10, 'img/' + i + '.jpg');
                contentMap[content.id] = content;
            }
            clearInterval(this);
            deferred.resolve(contentMap);
        }, 3000);

        // $http.get('/resources_list').
        // success(function(data, status, headers, config) {
        //     deferred.resolve(data);
        // }).
        // error(function(data, status, headers, config) {
        //     deferred.reject(status);
        //     // or server returns response with an error status.
        // });

        return deferred.promise;
    };

    function loadPres(presName, presID) {
        var deferred = $q.defer();
        var presentationMap = {};
        setInterval(function() {
            for (var i = 0; i < 10; i++) {
                presentationMap[i] = factory.presentationCreation(presName, 'description');
            }
            clearInterval(this);
            deferred.resolve(presentationMap);
        }, 3000);

        // $http.get('/loadPres').
        // success(function(data, status, headers, config) {
        //     deferred.resolve(data);
        // }).
        // error(function(data, status, headers, config) {
        //     deferred.reject(status);
        //     // or server returns response with an error status.
        // });

        return deferred.promise;
    };

    function savePres(presentation) {
        var deferred = $q.defer();
        deferred.resolve(JSON.stringify(presentation));
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
