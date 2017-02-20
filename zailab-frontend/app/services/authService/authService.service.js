'use strict';

angular.module('zailabAccountsApp')
	.factory('authService', ['$http', '$rootScope', '$q', 'utilService',
		function ($http, $rootScope, $q, utilService) {

			let serverUrl = utilService.getServerUrl();
			let user = null;
			// Public API here
			return {
				login: login,
				isAuthenticated: isAuthenticated,
				setUser: setUser,
				getUser: getUser,
				setCredentials: setCredentials,
				clearCredentials: clearCredentials,
				logout: logout
			};

			function setUser(value) {
				user = value;
			}

			function getUser() {
				return user;
			}

			function isAuthenticated() {
				if (localStorage.getItem('currentUser') == undefined) {
					return false;
				}

				$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
				if ($rootScope.currentUser) {
					setUser($rootScope.currentUser);
					return true;
				} else {
					return false;
				}
			}

			function login(credentials) {
				let deferred = $q.defer();
				let headers = {
					authorization: "Basic " + btoa(credentials.username + ":" + credentials.password),
					'Content-Type': 'application/form-data'
				};

				let url = serverUrl + 'user_login';
				$('#loginBusyBar').removeClass('hide').addClass('active');
				$http.get(url, {headers: headers})
					.then(response => {
						let data = response.data;
						if (data && (data.name !== 'anonymousUser' || data.userName || data.userName !== '')) {
							let user = {};
							user.userName = data.details.userName;
							user.name = data.name;
							user.permissions = data.details.permissions;
							user.authenticated = data.authenticated;
							setUser(user);
							setTimeout(function () {
								$('#loginBusyBar').addClass('hide').removeClass('active');
								deferred.resolve(response);
							}, 1500)
						} else {
							clearCredentials();
							setTimeout(function () {
								$('#loginBusyBar').addClass('hide').removeClass('active');
								deferred.reject('Invalid username/password combination. Please try again.');
							}, 1500)
						}
					}, error => {
						clearCredentials();
						setTimeout(function () {
							$('#loginBusyBar').addClass('hide').removeClass('active');
							deferred.reject('Invalid username/password combination. Please try again.');
						}, 1500)
					});

				return deferred.promise;
			}

			function setCredentials(username, password) {
				let currentUser = getUser();
				currentUser.authData = btoa(username + ":" + password);
				$rootScope.currentUser = currentUser;

				localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
			}

			function clearCredentials() {
				setUser(null);
				$rootScope.currentUser = {};
				localStorage.removeItem('currentUser');
			}

			function logout() {
				let deferred = $q.defer();
				let url = serverUrl + 'user_logout';
				$http.post(url, {}).then(response => {
					console.info('Successfully logged out!');
					clearCredentials();
					deferred.resolve(response);
				}, error => {
					console.error('Unable to log out:');
					console.error(error);
					deferred.reject(error);
				});
				return deferred.promise;
			}
		}]);
