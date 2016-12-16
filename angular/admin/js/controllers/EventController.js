angular.module('adminApp').controller('eventCtrl', eventCrtFnt);

eventCrtFnt.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function eventCrtFnt($scope, $log, $window, factory, comm) {

    $scope.currentPresentation = factory.presentationCreation("template_pres", "description of the template présentation");

    //for available content
    $scope.contentMap = {};
    $scope.contentMap.payload = "";

    //for presentation content
    $scope.presentationMap = {};
    $scope.presentationMap.payload = "";

    var available_content = comm.loadImages('test', 'test');
    var firstPresentation = comm.loadPres('test', 'test');

    available_content.then(
        function(payload) {
            $scope.contentMap.payload = payload;
            $scope.contentMap.array = factory.mapToArray(payload);
        },
        function(errorPayload) {
            $log.error('failure loading images', errorPayload);
        });


    firstPresentation.then(
        function(payload) {
            $scope.presentationMap.payload = payload;
            //TODO check next line
            for (key in $scope.presentationMap.payload) {
                $scope.currentPresentation = $scope.presentationMap.payload[key];
            }
        },
        function(errorPayload) {
            $log.error('failure loading presentation', errorPayload);
        });


    $scope.newSlide = function() {
        var slide = factory.slidCreation("slide-Title", "slide-text");
        $scope.currentPresentation.slideArray.push(slide);
    }

    $scope.savePres = function() {
        comm.savePres($scope.currentPresentation);
    }

    $scope.selectCurrentSlid = function(slide) {
        $scope.currentSlide = slide;

    }


    $scope.onDragComplete = function(data, evt) {
        console.log("drag success, data:", data);
    }


    $scope.onDropComplete = function(data, evt) {
        if ($scope.currentSlide != undefined) {
            $scope.currentSlide.contentMap[1] = data.id;
            //needed to inform angular that a change occurred on the current variable, this fire an event change
            $scope.$apply();
            //contentMap.payload[currentSlide.contentMap[1]].src
            console.log("drop success, data:", data);
            console.log("drop success, contentMap.payload:", $scope.contentMap.payload);
            console.log("drop success, currentSlide.contentMap[1]:", $scope.currentSlide.contentMap[1]);
        }
    }

    $scope.getCurrentContent = function() {
        if (1 in $scope.currentSlide.contentMap) {
            return $scope.currentSlide.contentMap[1];
        }
    }

    $scope.isSlidContentEmpty = function(slid) {
        if (slid.contentMap[1] == undefined) {
            return true;
        }
        return false
    }

};
