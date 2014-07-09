'use strict';

angular
.module('betfriendApp')
.controller('BetCtrl', function ($scope, $timeout, Bet, bet, match) {
	$scope.bet = {};
	$scope.match = match;
	$scope.create = Bet.create;
	console.log('-- Bet Ctrl --');
	console.dir(bet);
	console.dir(match);
});
