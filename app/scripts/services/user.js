'use strict';

angular
.module('betfriendApp')
.factory('User', function($rootScope, $firebase, $location, $route, $q, Auth, FIRE_URL, HOME_ROUTE){
	var currentUser;
	var fire = new Firebase(FIRE_URL+'users');
	var users = $firebase(fire);
	var fireRdy = false;
	var User = {
		create : function(user, pseudo){
			Auth.register(user)
				.then(function(authUser){
					users[authUser.uid] = {
						uid : authUser.uid,
						pseudo : pseudo,
						email : authUser.email,
						$priority : authUser.uid
					};
					users.$save(authUser.uid)
						.then(function(){
							User.setCurrentUser(authUser.uid);
						});
				});
		},
		setCurrentUser : function(uid){
			return User.findUserByUid(uid)
					.then(function(data){
						currentUser = data;
					});
		},
		getCurrentUser : function(){
			return currentUser;
		},
		getAll : function(){
			return users;
		},
		findUserByUid : function(uid){
			var deferred = $q.defer();
			var user = (uid)? users.$child(uid) : undefined;
			if(user){
				user.$on('loaded', function(){
					deferred.resolve(user);
				});
			}
			else{
				deferred.resolve(user);
			}
			return deferred.promise;
		},
		signedIn : function(){
			return currentUser !== undefined;
		},
		isAdmin : function(){
			return User.signedIn() && User.getCurrentUser() && User.getCurrentUser().email === 'jv.payou@gmail.com';
		},
		login : function(user, $scope){
			Auth.login(user)
				.then(function(authUser){
					User.setCurrentUser(authUser.uid)
						.then(function(){
							console.log('-- Login called --');
							$location.path(HOME_ROUTE);
						});
				},
				function(error){
					$scope.error = error.code;
					console.log('-- Login called with errors --');
				});
		},
		logout : function(){
			Auth.logout();
			User.setCurrentUser(undefined);
			$location.path('/');
		},
		checkRouteUserCredential : function(){
			var nextRoutePattern = $location.url();
			var nextRoute        = $route.routes[nextRoutePattern];
			if( !User.signedIn() && !(nextRoute && nextRoute.data && nextRoute.data.noAuth) ){
				$location.path('/');
			}
			if( nextRoute && nextRoute.data && nextRoute.data.noAuth && User.signedIn() ){
				$location.path('/dashboard');
			}
		},
		isRdy : function(){
			return fireRdy;
		},
		setRdy : function(){
			fireRdy = true;
		}
	};

	$rootScope.$on('$firebaseSimpleLogin:login', function(ev, authUser){
		User.setCurrentUser(authUser.uid)
			.then(function(){
				if(!$rootScope.showView){
					$rootScope.showView = true;
					User.checkRouteUserCredential();
				}
				$rootScope.$emit('user.rdy');
			});
	});
	$rootScope.$on('$firebaseSimpleLogin:logout', function(){
		currentUser = undefined;
		if(!$rootScope.showView){
			$rootScope.showView = true;
			User.checkRouteUserCredential();
		}
		$rootScope.$emit('user.rdy');
	});
	$rootScope.$on('$firebaseSimpleLogin:error', function(){
		if(!$rootScope.showView){
			$rootScope.showView = true;
			User.checkRouteUserCredential();
		}
		$rootScope.$emit('user.rdy');
	});
	return User;
});