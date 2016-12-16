angular.module('adminApp').controller('playerCtrl',playerConstructor);

playerConstructor.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function playerConstructor($scope, $log, $window, factory, comm) {
    $scope.backwardStep = function() {}
    $scope.backward = function() {}
    $scope.play = function() {}
    $scope.pause = function() {}
    $scope.forward = function() {}
    $scope.forwardStep = function() {}
};
