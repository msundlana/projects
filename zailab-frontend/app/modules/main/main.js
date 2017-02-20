'use strict';

angular.module('zailabAccountsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<main></main>'
			});
  }]);
