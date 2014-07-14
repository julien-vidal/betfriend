'use strict';

angular
.module('betfriendApp')
.controller('DashboardCtrl', function ($scope, User, Bet, matchs) {
	$scope.matchs = matchs;
	$scope.isAdmin = User.isAdmin();

	var _tagMatchHasBet = function(){
		var currentUser = User.getCurrentUser();
		var uid = (currentUser)? currentUser.uid : '';
		var matchIds = $scope.matchs.$getIndex();
		matchIds.forEach(function(matchId) {
			var bet = null;
			if(uid && !$scope.matchs[matchId].userBet){
				bet = Bet.get(Bet.betKey(matchId, uid))
					.$on('loaded', function(data){
						bet.$off();
						$scope.matchs[matchId].hasBet = !!(data && data.mid !== undefined);
					});
			}
		});
	};

	$scope.styleBetIcon = function(hasBet){
		return (hasBet)? 'pencil' : 'plus';
	};
	// When user load that page first, user data arent here in time so we watch
	// that property.
	$scope.$watch(function(){
			return User.isAdmin();
		},
		function(){
			$scope.isAdmin = User.isAdmin();
			_tagMatchHasBet();
		});

	_tagMatchHasBet();
});
