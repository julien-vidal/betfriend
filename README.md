betfriend
=========

World cup bet system based on angularJs and Firebase
This is a simple draft for angularjs and firebase training.

## Install

This project need a firebase. After you create a firebase app, create a conf.js file in app/scripts/ with the following code

    'use strict';
    angular
    .module('betfriendApp')
    .constant('FIRE_URL', 'url to your firebase');
