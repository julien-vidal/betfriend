'use strict';

angular
.module('betfriendApp')
.controller('RegisterCtrl', function ($scope, $location, User) { //HOME_ROUTE
	$scope.register = function(){
		// @todo : Add error checking
		User.create($scope.user, $scope.pseudo);
	};
});
