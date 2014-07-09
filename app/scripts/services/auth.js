'use strict';

angular
.module('betfriendApp')
.factory('Auth', function($firebaseSimpleLogin, FIRE_URL){
	var fireSL = $firebaseSimpleLogin(new Firebase(FIRE_URL));
	var Auth = {
		register : function(user){
			return fireSL.$createUser(user.email, user.password);
		},
		login : function(user){
			return fireSL.$login('password', user);
		},
		logout : function(){
			console.log('Logout Called !');
			return fireSL.$logout();
		}
	};
	return Auth;
});