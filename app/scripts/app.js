'use strict';

angular
.module('betfriendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
.constant('HOME_ROUTE', '/dashboard')
.constant('FULL_DATE_FORMAT', 'YYYY-MM-DD HH:mm')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      data : {
        noAuth : true
      }
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl',
      data : {
        noAuth : true
      }
    })
    .when('/manage-match', {
      templateUrl: 'views/manage-match.html',
      controller: 'ManageMatchCtrl'
    })
    .when('/manage-match/:id', {
      templateUrl: 'views/manage-match.html',
      controller: 'ManageMatchEditCtrl',
      resolve : {
        match : function($q, $route, Match){
          var defer = $q.defer();
          var match = Match.get($route.current.params.id);
          var result = match;
          if(!Match.isRdy()){
            match.$on('loaded', function(){
              match.$off('loaded');
              Match.setRdy();
              defer.resolve(match);
            });
            result = defer.promise;
          }
          return result;
        }
      }
    })
    .when('/bet/:matchId', {
      templateUrl: 'views/bet.html',
      controller: 'BetCtrl',
      resolve : {
        betAndMatch : function($q, $rootScope, $route, Match, User, Bet){
          // 1/ Get current user, on page loading this information are loaded too late
          var currentUser = function(){
            var defer = $q.defer();
            var currentuser = User.getCurrentUser();
            var deregister = null;
            if(!!!currentuser && !User.isRdy()){
              deregister = $rootScope.$on('user.rdy', function(){
                deregister();
                User.setRdy();
                defer.resolve(User.getCurrentUser());
              });
            }
            else{
              defer.resolve(currentuser);
            }
            return defer.promise;
          };

          // 0/ We need to fetch match information for bet an eventual user bet load
          var currentMatch = function(currentUser){
            var defer = $q.defer();
            var match = Match.get($route.current.params.matchId);
            if(!Match.isRdy()){
              match.$on('loaded', function(){
                match.$off('loaded');
                Match.setRdy();
                defer.resolve({match : match, user : currentUser});
              });
            }
            else {
              defer.resolve({match : match, user : currentUser});
            }
            return defer.promise;
          };


          // 2/ Try to fetch the user bet
          var bet = function(matchAndUser){
            var defer = $q.defer();
            var bet = Bet.get(Bet.betKey(matchAndUser.match.$id, matchAndUser.user.uid));
            if(bet && !Bet.isRdy()){
              bet.$on('loaded', function(){
                bet.$off('loaded');
                Bet.setRdy();
                defer.resolve({bet : bet, match : matchAndUser.match});
              });
            }
            else{
              defer.resolve({bet : bet, match : matchAndUser.match});
            }
            return defer.promise;
          };
          
          // 3/ Launch that ugly promise chain !
          return currentUser()
            .then(currentMatch)
            .then(bet)
            .then(function(betAndMatch){
              return betAndMatch;
            });
        }
      }
    })
    .when('/logout', {
      template : '<div>logout</div>',
      controller: 'LogoutCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/main.html',
      controller: 'DashboardCtrl',
      resolve : {
        matchs : function($q, Match){
          var defer = $q.defer();
          var matchs = Match.getAll();
          var result = matchs;
          if(!Match.isRdy()){
            matchs.$on('loaded', function(){
              matchs.$off('loaded');
              Match.setRdy();
              defer.resolve(matchs);
            });
            result = defer.promise;
          }
          return result;
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function($rootScope, $location, $route, User){
  $rootScope.showView = false;
  $rootScope.$on('$locationChangeStart', function(){
    if($rootScope.showView){
      User.checkRouteUserCredential();
    }
  });
});
