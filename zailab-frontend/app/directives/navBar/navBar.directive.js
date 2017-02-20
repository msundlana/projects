'use strict';

angular.module('zailabAccountsApp')
	.directive('navBar', () => ({
		templateUrl: 'directives/navBar/navBar.html',
		restrict: 'E',
		controller: 'NavBarController',
		controllerAs: 'navBar'
	}));
