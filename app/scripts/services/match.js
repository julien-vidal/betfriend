'use strict';

angular
.module('betfriendApp')
.factory('Match', function($filter, $firebase, FIRE_URL, FULL_DATE_FORMAT){
	var fire = new Firebase(FIRE_URL+'matchs');
	var matchs = $firebase(fire);
	var fireRdy = false;
	var Match = {
		create : function(match){
			match.timestamp = Match.parseToUnixDate(match.date, match.time);
			delete match.date;
			delete match.time;
			return matchs.$add(match);
		},
		edit : function(matchId, match){
			match.timestamp = Match.parseToUnixDate(match.date, match.time);
			delete match.date;
			delete match.time;
			matchs[matchId] = match;
			return matchs.$save(matchId);
		},
		get : function(matchId){
			return matchs.$child(matchId);
		},
		getAll : function(){
			return matchs;
		},
		parseToUnixDate : function(date, time){
			return moment(date+' '+time, FULL_DATE_FORMAT).valueOf();
		},
		parseToEdit : function(match){
			match.date = $filter('date')(match.timestamp, 'yyyy-MM-dd');
			match.time = $filter('date')(match.timestamp, 'HH:mm');
			return match;
		},
		isRdy : function(){
			return fireRdy;
		},
		setRdy : function(){
			fireRdy = true;
		}
	};
	return Match;
});