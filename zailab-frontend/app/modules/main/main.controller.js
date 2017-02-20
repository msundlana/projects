'use strict';
(function () {
	let $controller;
	class MainComponent {
		constructor($state, $scope) {
			$(window).scroll(function () {
				if ($(document).scrollTop() > 25) {
					$('.toolbar').addClass("toolbar-fixed");
					$('.wrapper').removeClass("animated fadeInUp");
				} else {
					$('.toolbar').removeClass("toolbar-fixed");
				}
			});
			$controller = this;
			$controller.$scope = $scope;
			$controller.$state = $state;
		}

		$onInit() {
		}
	}

	angular.module('zailabAccountsApp')
		.value('duScrollOffset', 90)
		.value('duScrollDuration', 1000)
		.value('duScrollBottomSpy', false)
		.component('main', {
			templateUrl: 'modules/main/main.html',
			controller: ['$state', '$scope', MainComponent],
			controllerAs: 'MainCtrl'
		})
})();
