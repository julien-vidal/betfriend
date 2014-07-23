'use strict';
// @current : Work on that directive who display current user ranking according to theirs bet on matches
// Rules (simplified):
// 	- Good bet : 1pt
// 	- Exact bet : 2pt
// 	- Bad bet : 0pt
angular
.module('betfriendApp')
.directive('userRanking', function(){
	return {
		restrict : 'E',
		templateUrl : 'views/user-ranking.html'
	};
});