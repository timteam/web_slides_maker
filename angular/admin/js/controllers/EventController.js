angular.module('adminApp')
    .controller('eventCtrl', eventCtrlFn);
eventCtrlFn.$inject = ['$scope', '$log', '$window', 'factory'];

function eventCtrlFn($scope, $log, $window, factory) {
    $scope.currentPresentation = factory.presentationCreation('Presentation Title', 'Pres description');

    $scope.newSlide = function() {
        $scope.currentPresentation.slides.push( factory.slidCreation('Slide Title', 'Slide desc'));
    };

    $scope.selectCurrentSlide = function(slide) {
        angular.forEach($scope.currentPresentation.slides, function(value, key) {
            $scope.currentPresentation.slides[key].selected = false;
        })
        slide.selected = true;
        $scope.currentSlide = slide;
    }

    $scope.isSlideContentEmpty = function(slide) {
        return (slide.contentMap[1] === undefined) ? true : false;
    }
}
