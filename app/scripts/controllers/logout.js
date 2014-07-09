'use strict';

angular
.module('betfriendApp')
.controller('LogoutCtrl', function ($location, User) {
	User.logout();
});
