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
        setInterval(function(presID) {
            for (var i = 0; i < 9; i++) {
                contentMap[i] = factory.contentCreation('Title ' + i, 'jpg', 'img/' + i + '.jpg');
            }
            clearInterval(this);
            deferred.resolve(contentMap);
        }, 3000, presID);
        return deferred.promise;
    };

    function loadPres(presName, presID) {
      var deferred = $q.defer();
      //var contentMap = {"key1":"value1","key2":"value2"};
      var contentMap = {};
      setInterval(function(presID) {
          for (var i = 0; i < 9; i++) {
              contentMap[i] = factory.contentCreation('Title ' + i, 'jpg', 'img/' + i + '.jpg');
          }
          clearInterval(this);
          deferred.resolve(contentMap);
      }, 3000, presID);
      return deferred.promise;
    };

    function savePres() {
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
    };

    //TODO
    return comm;

};
