angular.module('loginApp')
    .controller('loginCtrl', loginCrtFnt);
loginCrtFnt.$inject = ['$scope', '$log', '$window', 'auth'];

function loginCrtFnt($scope, $log, $window, auth) {

    $scope.logAuthObject = function(user) {
        if (user != null) {
            auth.userList();
            if (auth.checkUser(user.login, user.pwd)){
              $window.open('loginSuccess.html', '_self');
            }else{
              $scope.errorMessage = 'Invalid Credentials';
            }
        }
    };
}
