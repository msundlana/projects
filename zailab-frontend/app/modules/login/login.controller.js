'use strict';
(function () {
	let $controller;
	class LoginComponent {
		constructor($state,$filter, authService) {
			$controller = this;

			$controller.$state = $state;
			$controller.$filter = $filter;
			$controller.authService = authService;
			$controller.credentials = {
				username: '',
				password: ''
			};
			$controller.errorMessage = '';
			$controller.authenticated = '';
			$controller.loading = false;
		}

		$onInit() {
			$controller.authService.clearCredentials();
		}

		login(credentials) {
			$controller.loading = true;
			$controller.authService.login(credentials)
				.then(response => {
						$controller.authService.setCredentials(credentials.username, credentials.password);
						$controller.errorMessage = '';
						$controller.authenticated = (response.data.authenticated);
						$controller.$state.go('home');
					}, error => {
						$controller.authenticated = false;
						$controller.errorMessage = error;
						$controller.loading = false;
					}
				);
		};
	}

	angular.module('zailabAccountsApp')
		.component('login', {
			templateUrl: 'modules/login/login.html',
			controller: ['$state','$filter', 'authService',LoginComponent]
		});

})();
