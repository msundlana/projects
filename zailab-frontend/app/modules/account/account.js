'use strict';

angular.module('zailabAccountsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home.account', {
        url: 'account',
        template: '<account></account>',
				parent: 'home',
				data: {pageTitle: 'Account'},
      });
  }]);
