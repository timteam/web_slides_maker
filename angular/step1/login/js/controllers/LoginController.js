angular.module('loginApp')
    .controller('loginCtrl', loginCrtFnt);
loginCrtFnt.$inject = ['$scope', '$log', '$window', 'auth'];

function loginCrtFnt($scope, $log, $window, auth) {

    $scope.logAuthObject = function(user) {
        // if (user != null) {
        //     auth.userList();
        //     if (auth.checkUser(user.login, user.pwd)){
        //       $window.open('loginSuccess.html', '_self');
        //     }else{
        //       $scope.errorMessage = 'Invalid Credentials';
        //     }
        // }
        if (user != null) {
            var promise = auth.localAuthAsk(user.login, user.pwd);
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
            }, function(role) {
                $scope.errorMessage = 'Invalid Credentials';
            });
        }
    };
}
