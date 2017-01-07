angular.module('adminApp').controller('playerCtrl', playerConstructor);

playerConstructor.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function playerConstructor($scope, $log, $window, factory, comm) {
    //console.log("Player access parent scope: ", $scope.$parent.currentPresentation);
    var socket = comm.io.socketConnection($scope, factory.generateUUID());
    $scope.begin = function() {
      comm.io.emitBegin(socket);
    }
    $scope.backward = function() {
      comm.io.emitPrev(socket);
    }
    $scope.play = function(presUUID) {
      comm.io.emitStart(socket, presUUID);
    }
    $scope.pause = function() {
      comm.io.emitPause(socket);
    }
    $scope.forward = function() {
      comm.io.emitNext(socket);
    }
    $scope.end = function() {
      comm.io.emitEnd(socket);
    }
};
