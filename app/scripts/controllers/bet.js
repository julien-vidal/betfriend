'use strict';

angular
.module('betfriendApp')
.controller('BetCtrl', function ($scope, $location, Bet, HOME_ROUTE, betAndMatch) {
	$scope.bet = betAndMatch.bet;
	$scope.match = betAndMatch.match;
	$scope.create =  function(bet, match){
		Bet
			.create(bet, match)
			.then(function(){
				$location.path(HOME_ROUTE);
			});
	};
});
