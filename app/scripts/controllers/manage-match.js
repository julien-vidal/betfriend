'use strict';

angular
.module('betfriendApp')
.controller('ManageMatchCtrl', function ($scope, Match) {
	$scope.match = {};
	$scope.create = function(match){
		Match.create(match);
		$scope.match = {};
	};
	$scope.btnLocale = 'Créer';
});
