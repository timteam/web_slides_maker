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
            selected: false,
            content: {
                text: 'Content Text',
                img: 'banner-angularjs.jpg'
            }
        });
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
