'use strict';

angular.module('zailabAccountsApp')
  .directive('sideNav', () => ({
      templateUrl: 'directives/sideNav/sideNav.html',
      restrict: 'EA',
      controller: 'SideNavController',
			controllerAs: 'sideNav'
  }));
