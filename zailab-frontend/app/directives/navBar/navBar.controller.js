'use strict';

(function () {
	let $controller;
	class NavBarController {
		constructor($http, $state,authService) {
			$controller = this;

			$controller.$http = $http;
			$controller.$state = $state;
			$controller.authService = authService;
		}

		logout() {
			$controller.authService.logout().then(resolve => {
				$controller.$state.go('login');
			}, reject => {});
		}
	}

//end-non-standard

	angular.module('zailabAccountsApp')
		.controller('NavBarController', ['$http', '$state','authService', NavBarController]);

})();
