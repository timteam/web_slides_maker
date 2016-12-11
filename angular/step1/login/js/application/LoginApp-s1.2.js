//Creation of an application not needed to bind it to a global variable
angular.module( 'loginApp', [] );
angular.module( 'loginApp' )
  .controller( 'loginCtrl', loginCrtFnt );
loginCrtFnt.$inject = [ '$scope', '$log' ];

function loginCrtFnt( $scope, $log ) {
  // $scope.logAuth = function () {
  //   $log.info( 'user login', $scope.user.login );
  //   $log.info( 'user pwd', $scope.user.pwd );
  // };
  $scope.logAuthObject = function ( user ) {
    $log.info( 'user login', user.login );
    $log.info( 'user pwd', user.pwd );
  };
  // $scope.login = function () {
  //   $log.info( 'login action called' );
  // }
}
