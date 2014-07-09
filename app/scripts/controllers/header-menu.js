'use strict';

// @current : create normal user and check if match not here
angular
.module('betfriendApp')
.controller('HeaderMenuCtrl', function ($rootScope, $scope, User) {
	var _refreshRight = function(){
		$scope.isLogged = User.signedIn();
		$scope.isAdmin = User.isAdmin();
	};
	$scope.menuLinks = [
		{'label' : 'Tableau de bord', 'link' : '#dashboard', 'checkAdmin' : false},
		{'label' : 'Matchs', 'link' : '#manage-match', 'checkAdmin' : true},
		{'label' : 'Déconnexion', 'link' : '#logout' , 'checkAdmin' : false}
	];
	$scope.showLink = function(link){
		return !link.checkAdmin || (link.checkAdmin && $scope.isAdmin);
	};
	$rootScope.$on('user.rdy', _refreshRight);
});