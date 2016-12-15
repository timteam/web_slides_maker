angular.module('loginApp')
    .controller('loginCtrl', loginCrtFnt);
loginCrtFnt.$inject = ['$scope', '$log', '$window', 'auth'];

function loginCrtFnt($scope, $log, $window, auth) {

    $scope.logAuthObject = function(user) {
        if (user != null) {
            var promise = auth.localAuthAsk(user.login, user.pwd);
            //var promise = auth.authAsk(user.login, user.pwd);
            promise.then(function(role) {
                switch (role) {
                    case 'admin':
                        $window.open('admin.html', '_self');
                        break;
                    case 'watcher':
                        $window.open('watch.html', '_self');
                        break;
                    default:
                        $scope.errorMessage = 'Unknown role';

                }
            }, function(error) {
                $scope.errorMessage = error;
            });
        }
    };
}
