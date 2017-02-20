'use strict';

describe('Component: LoginComponent', function () {

  // load the controller's module
  beforeEach(module('zailabAccountsApp'));

  var LoginComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoginComponent = $componentController('LoginComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
