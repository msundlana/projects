'use strict';

angular.module('zailabAccountsApp')
	.factory('accountService',['$http', 'utilService',
	function ($http,utilService) {

		// Public API here
		return {
			openAccount: openAccount,
			getAccounts: getAccounts,
			getAccount: getAccount,
			withdraw: withdraw,
			deposit: deposit,
			setOverDraftLimt: setOverDraftLimt
		};


		function openAccount(account, accountType, callback) {
			var url = utilService.getServerUrl() + 'account/open_account?accountType=' +
				accountType;
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.post(url,account).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
		function getAccounts(callback) {
			var url = utilService.getServerUrl() + 'account/accounts';
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.get(url).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
		function getAccount(accountId,callback) {
			var url = utilService.getServerUrl() + 'account/account?accountId=' + accountId;
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.get(url).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
		function withdraw(accountId,amountToWithdraw, callback) {
			var url = utilService.getServerUrl() + 'account/withdraw?accountId=' + accountId + '&amountToWithdraw=' + amountToWithdraw;
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.get(url).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
		function deposit(account, callback) {
			var url = utilService.getServerUrl() + 'account/deposit';
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.post(url,account).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
		function setOverDraftLimt(account, callback) {
			var url = utilService.getServerUrl() + 'account/overdraft_limit';
			var resultObj = {
				status: '',
				msg: '',
				data: {}
			};

			Pace.start();
			$http.post(url,account).then(function successCallback(response) {

				resultObj.status = 'SUCCESS';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				callback(resultObj);

			}, function errorCallback(response) {
				resultObj.status = 'FAILURE';
				resultObj.msg = response.status + ' - ' + response.statusText;
				resultObj.data = response.data;
				Pace.stop();
				utilService.errorSwal(response.data.localizedMessage, response.data.stackTrace);
				callback(resultObj);

				console.log('FAILED' + response);
			})
		}
	}]);
