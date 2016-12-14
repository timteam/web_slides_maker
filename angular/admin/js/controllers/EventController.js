angular.module('adminApp')
    .controller('eventCtrl', eventCtrlFn);
eventCtrlFn.$inject = ['$scope', '$log', '$window', 'factory'];

function eventCtrlFn($scope, $log, $window, factory) {

    $scope.action = function(viewObject) {

    };
}
