'use strict';

describe('Component: MainComponent', function () {

  // load the controller's module
  beforeEach(module('zailabAccountsApp'));

  var MainComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MainComponent = $componentController('MainComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
