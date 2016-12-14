angular.module('adminApp')
    .controller('eventCtrl', eventCtrlFn);
eventCtrlFn.$inject = ['$scope', '$log', '$window', 'factory'];

function eventCtrlFn($scope, $log, $window, factory) {
    $scope.currentPresentation = {
        title: 'Presentation Title',
        slides: [],
    };

    $scope.newSlide = function() {
      //add object slide that contains an object content to currentPresentation
        $scope.currentPresentation.slides.push({
                title: 'Slide Title',
                content: {text:'Content Text', img:'banner-angularjs.jpg'}
            });
    };


    $scope.selectCurrentSlid = function(slide) {
        $scope.currentSlide = slide;
    }
    $scope.isSlidContentEmpty = function(slid) {
        if (slid.contentMap[1] == undefined) {
            return true;
        }
        return false;
    }
}
