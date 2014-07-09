'use strict';

angular
.module('betfriendApp')
.controller('DashboardCtrl', function ($scope, User, matchs) {
	$scope.matchs = matchs;
	$scope.isAdmin = User.isAdmin();
});
