angular.module('watcherApp').controller('watcherCtrl', watcherCrtFnt);

watcherCrtFnt.$inject = ['$scope','factory','comm'];

function watcherCrtFnt($scope, factory, comm) {

    $scope.contentMap={};
    $scope.contentMap.payload="";

    var available_content=comm.loadImages('test','test');
    available_content.then(
        function(payload) {
            $scope.contentMap.payload = payload;
            $scope.contentMap.array=factory.mapToArray(payload);
        },
        function(errorPayload) {
            $log.error('failure loading movie', errorPayload);
        });

    var socket = io.connect();
    socket.on('connection', function (data) {
        socket.emit('data_comm', socket.io.engine.id);
    });

    socket.on('currentSlidEvent', function (data) {
        console.log(data);
        $scope.currentSlide = data;
        console.log($scope.currentSlide);
        $scope.$apply(function() { $scope.currentSlide = data; });
    });

    $scope.isSlidContentEmpty=function(slid){
        if(slid.contentMap[1]== undefined){
            return true;
        }
        return false
    }
};
