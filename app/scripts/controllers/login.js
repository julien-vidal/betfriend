'use strict';
// HOME_ROUTE
angular
.module('betfriendApp')
.controller('LoginCtrl', function ($scope, User) {
	$scope.error = '';
	$scope.login = function(){
		User.login($scope.user, $scope);
	};
});
