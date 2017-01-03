angular.module('authService', []).service('auth', authFnc);
authFnc.$inject = ['$log', '$http', '$q'];

function authFnc($log, $http, $q) {
    var userMap = {};
    userMap['jdoe'] = 'jdoepwd';
    userMap['tim'] = 'tim';
    userMap['psmith'] = 'psmithpwd';
    userMap['tp'] = 'tp';

    var roleMap = {};
    roleMap['jdoe'] = 'watcher';
    roleMap['tim'] = 'admin';
    roleMap['psmith'] = 'watcher';
    roleMap['tp'] = 'admin';

    var fncContainer = {
        checkUser: checkUser,
        userList: userList,
        localAuthAsk: localAuthAsk,
        authAsk: authAsk
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

    function localAuthAsk(login, pwd) {
        var deferred = $q.defer();
        setInterval(function(login, pwd) {
            if (userMap[login] === pwd) {
                deferred.resolve(roleMap[login]);
            } else {
                deferred.reject('Invalid Credentials');
            }
            clearInterval(this);
        }, 3000, login, pwd);
        return deferred.promise;
    }

    function authAsk(login, pwd) {
        var deferred = $q.defer();
        $http.post('/fakeauthwatcher', {
            'login': login,
            'pwd': pwd
        }).success(function(data, status, headers, config) {
            deferred.resolve(roleMap[login]);//add role and token
        }).error(function(data, status, headers, config) {
            deferred.reject({'headers':headers, 'status': status, 'test':'test'});
            // or server returns response with an error status.
        });
        return deferred.promise;
    };
    return fncContainer;
}
