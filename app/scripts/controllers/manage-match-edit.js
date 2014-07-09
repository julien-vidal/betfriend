'use strict';

angular
.module('betfriendApp')
.controller('ManageMatchEditCtrl', function ($scope, $routeParams, Match, match) {
	var _matchId = $routeParams.id;
	$scope.match = Match.parseToEdit(match);
	$scope.create = function(match){
		Match.edit(_matchId, match);
		$scope.match = Match.parseToEdit(match);
	};
	$scope.btnLocale = 'Modifier';
});
