'use strict';

angular.module('zailabAccountsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
				data: {pageTitle: 'Login'}
      });
  }]);
