'use strict';
angular
.module('betfriendApp')
.factory('Bet', function($firebase, User, FIRE_URL){
	var fire = new Firebase(FIRE_URL+'bets');
	var bets = $firebase(fire);
	var fireRdy = false;
	var Bet = {
		create : function(bet, match){
			var betId = null;
			bet.mid = match.$id;
			bet.uid = User.getCurrentUser().uid;
			betId = Bet.betKey(bet.mid,bet.uid);
			bets[betId] = bet;
			return bets.$save(betId);
		},
		edit : function(betId, bet){
			bets[betId] = bet;
			return bets.$save(betId);
		},
		get : function(betId){
			return bets.$child(betId);
		},
		getAll : function(){
			return bets;
		},
		isRdy : function(){
			return fireRdy;
		},
		setRdy : function(){
			fireRdy = true;
		},
		betKey : function(matchId, uid){
			return matchId+uid;
		}
	};
	return Bet;
});