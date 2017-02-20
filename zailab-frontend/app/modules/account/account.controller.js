'use strict';

(function(){
var $controller;
	class AccountComponent {
		constructor($state,$scope,$timeout,accountService,utilService) {

			$controller = this;
			$controller.$state = $state;
			$controller.$scope = $scope;
			$controller.accountService = accountService;
			$controller.utilService = utilService;
			$controller.$timeout = $timeout;
			$controller.accountQuery = {
				accountId: null,
				accountType: 0,
				amount:0
			};

			$controller.errorMessage = null;

			$controller.AccountsTableControl = angular.copy(utilService.getTableControl());
			$controller.AccountsTableControl.options.columns = [
				{
					field: 'id',
					formatter: function (value, row) {
						return [value != null ? value : '-'].join(' ');
					}
				}, {
					field: 'type',
					formatter: function (value, row) {
						return [value != null ? (value) : '-'].join(' ');
					}
				}, {
					field: 'balance',
					formatter: function (value, row) {
						return [value != null ? (value) : '-'].join(' ');
					}
				}, {
					field: 'overdraft',
					formatter: function (value, row) {
						return [value != null && row.type == 'CURRENTACCOUNT'? (value) : '-'].join(' ');
					}
				}
			];
			$controller.AccountsTableControl.options.pageSize =  20;
			$controller.AccountsTableControl.options.pageList = [20, 50, 100, 200, 500, 1000];
			$controller.AccountsTableControl.options.sidePagination = 'client';


		}

		$onInit() {
			$controller.getAccounts();
		}

		$onDestroy() {
		}

		openAccount() {
			var accountQuery = $controller.accountQuery;
			$controller.errorMessage = null;
			if(accountQuery.accountType==1 && accountQuery.amount < 1000){
				$controller.errorMessage = 'A Savings account can only be opened if you deposit at least R1000';
				return;
			}
			var account = {
				id: accountQuery.accountId,
				balance:accountQuery.amount
			};

			$controller.accountService.openAccount(account, accountQuery.accountType,
				function (response) {
					if (response.status === 'FAILURE') {
						console.log('An Error occurred: \n' + response.msg);
					} else {
						$controller.AccountsTableControl.options.data = response.data;
						$controller.$timeout(function () {
							$('#tbl-accounts').bootstrapTable('refresh')
						});
					}
				});
	}

		getAccounts() {
			$controller.errorMessage = null;
		$controller.accountService.getAccounts(
			function (response) {
				if (response.status === 'FAILURE') {
					console.log('An Error occurred: \n' + response.msg);
				} else {
					$controller.AccountsTableControl.options.data = response.data;
					$controller.$timeout(function () {
						$('#tbl-accounts').bootstrapTable('refresh')
					});
				}
			});
	}

		getAccount() {
			$controller.errorMessage = null;
			var accountId = $controller.accountQuery.accountId;
		$controller.accountService.getAccount(accountId,
			function (response) {
				if (response.status === 'FAILURE') {
					console.log('An Error occurred: \n' + response.msg);
				} else {
					$controller.AccountsTableControl.options.data = response.data;
					$controller.$timeout(function () {
						$('#tbl-accounts').bootstrapTable('refresh')
					});
				}
			});
	}

		withdraw() {
			$controller.errorMessage = null;
			var accountQuery = $controller.accountQuery;
		$controller.accountService.withdraw(accountQuery.accountId,accountQuery.amount,
			function (response) {
				if (response.status === 'FAILURE') {
					console.log('An Error occurred: \n' + response.msg);
				} else {
					$controller.AccountsTableControl.options.data = response.data;
					$controller.$timeout(function () {
						$('#tbl-accounts').bootstrapTable('refresh')
					});
				}
			});
	}

		deposit() {
			$controller.errorMessage = null;
			var accountQuery = $controller.accountQuery;
			var account = {
				id: accountQuery.accountId,
				balance:accountQuery.amount
			};
		$controller.accountService.deposit(account,
			function (response) {
				if (response.status === 'FAILURE') {
					console.log('An Error occurred: \n' + response.msg);
				} else {
					$controller.AccountsTableControl.options.data = response.data;
					$controller.$timeout(function () {
						$('#tbl-accounts').bootstrapTable('refresh')
					});
				}
			});
	}

		setOverDraftLimt() {
			var accountQuery = $controller.accountQuery;
			$controller.errorMessage = null;
			if(accountQuery.accountType==0 && accountQuery.amount > 100000){
				$controller.errorMessage = 'The maximum overdraft limit allowed on a Current Account by Acme Bank is R100000';
				return;
			}else if(accountQuery.accountType==1){
				$controller.errorMessage = 'A Savings Account does not have an overdraft';
				return;
			}
			var account = {
				id: accountQuery.accountId,
				overdraft:accountQuery.amount
			};
		$controller.accountService.setOverDraftLimt(account,
			function (response) {
				if (response.status === 'FAILURE') {
					console.log('An Error occurred: \n' + response.msg);
				} else {
					$controller.AccountsTableControl.options.data = response.data;
					$controller.$timeout(function () {
						$('#tbl-accounts').bootstrapTable('refresh')
					});
				}
			});
	}
	}

	angular.module('zailabAccountsApp')
		.component('account', {
			templateUrl: 'modules/account/account.html',
			controller:['$state','$scope','$timeout','accountService','utilService',AccountComponent]
		});

})();
