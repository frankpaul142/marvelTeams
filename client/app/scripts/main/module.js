'use strict';

angular.module('App', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'scripts/main/views/dashboard.html'
            });
    });