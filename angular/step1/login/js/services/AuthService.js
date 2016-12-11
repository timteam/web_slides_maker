angular.module('authService', []).service('auth', authFnc);
authFnc.$inject = ['$log'];

function authFnc($log) {
    var userMap = {};
    userMap['jdoe'] = 'jdoepwd';
    userMap['tim'] = 'tim';
    userMap['psmith'] = 'psmithpwd';
    userMap['tp'] = 'tp';
    var fncContainer = {
        checkUser: checkUser,
        userList: userList
    };

    function checkUser(userlogin, userpwd) {
        //login successful
        return (userMap[userlogin] === userpwd) ? true : false;
    };

    function userList() {
        for (var userKey in userMap) {
            $log.info('user list: ', '[' + userKey + '] = ' + userMap[userKey]);
        }
    };



    return fncContainer;
}
