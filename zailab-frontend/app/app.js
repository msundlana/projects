'use strict';

/**
 * @ngdoc overview
 * @name zailabAccountsApp
 * @description
 * # Zailab Accounts App
 *
 * Main module of the application.
 */

angular.module('zailabAccountsApp', [
	'ui.router',                    // Routing
	'ui.bootstrap',                 // Bootstrap
	'pascalprecht.translate', 			// Language translator
	'bsTable', 											// Bootstrap Table
	'duScroll',											// Angular Scroll
	'jcs-autoValidate',
	'LocalStorageModule',						// Local Storage
	'inspinia',											// Inspinia
	'underscore',
	'ngIdle',
])

	.run(['$rootScope', '$state','authService',
		function ($rootScope, $state,authService) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
				Pace.start();
				if (toState.url !== '/login' && !authService.isAuthenticated()) {
					event.preventDefault();
					$rootScope.errorMessage = 'Your have been logout, login!!';
					$rootScope.errorReason = '';
					$state.go('login');
				} else {
					$rootScope.errorMessage = '';
					$rootScope.errorReason = '';
				}
			});

			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				Pace.stop();
			});

			$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				Pace.stop();
			});

			Pace.on("start", function () {
				swal({
					showConfirmButton: false,
					allowEscapeKey: false,
					width: 0,
					padding: 0,
				});
				$('#busyBar').removeClass('hide').addClass('active');
			});

			Pace.on("done", function () {
				swal.close();
				$('#busyBar').addClass('hide').removeClass('active');
			});
		}
	])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
			$urlRouterProvider.otherwise('/error');
			$stateProvider
				.state('error', {
					url: '/error',
					templateUrl: 'partials/404.html'
				});

			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		}
	]);
