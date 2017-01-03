angular.module('adminApp').controller('playerCtrl', playerConstructor);

playerConstructor.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function playerConstructor($scope, $log, $window, factory, comm) {
    //console.log("Player access parent scope: ", $scope.$parent.currentPresentation);
    $scope.imgToShow;
    $scope.begin = function() {}
    $scope.backward = function() {}
    $scope.play = function() {
        angular.forEach($scope.$parent.currentPresentation.slideArray, function(slide, key) {
            try {
                $scope.imgToShow = $scope.$parent.contentMap.payload[slide.contentMap[1]].src;
                console.log("imgToShow :", $scope.imgToShow);
            } catch (e) {
            }
        });
    }
    $scope.pause = function() {}
    $scope.forward = function() {}
    $scope.end = function() {}
};
