'use strict';

class SideNavController {
	constructor($state) {
		this.$state = $state;
	}
}

//end-non-standard

angular.module('zailabAccountsApp')
	.controller('SideNavController', ['$state',  SideNavController]);
