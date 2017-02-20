'use strict';

angular.module('zailabAccountsApp')
	.factory('utilService', ['$rootScope', '$filter',
		function ($rootScope, $filter) {
			let host = window.location.protocol + '//' + window.location.host +'/';

			let SERVERS = Object.freeze({
				'HOST': host,
				'Tomcat server': 'http://localhost:8080/',
			});

			let server = 'HOST';
			let serverUrl = '';
			let tableControl = {
				options: {
					striped: true,
					pagination: true,
					pageSize: 20,
					pageList: [20, 50, 100, 200, 500, 1000],
					paginationVAlign: 'both',
					sidePagination: 'server',
					queryParamsType: 'Else',
					cache: false,
					ajaxOptions: {
						beforeSend: function (xhr) {
							xhr.setRequestHeader("Authorization", ("Basic " + $rootScope.currentUser.authData));
						},
					},
					rowStyle: function (row, index) {
						if (index % 2 == 0) {
							return {classes: 'info'}
						} else {
							return {classes: 'none'}
						}
					},
					formatNoMatches: function () {
						return ['No entries found to display'].join(' ');
					},
					formatRecordsPerPage: function (pageNumber) {
						let temp = `<span class="m-l-xl"></span>`;
						return ['Page Size ' + pageNumber].join(' ');
					},
					formatShowingRows: function (pageFrom, pageTo, totalRows) {
						return ['No. of Entries ' + totalRows].join(' ');
					},
					formatDetailPagination: function (totalRows) {
						return ['No. of Entries ' + totalRows].join(' ');
					},
					onLoadError: function (status, res) {
						console.log('LOADING ERROR!!!\n' + status + '\n' + res)
					}
				}
			};

			setServer(server);
			// Public API here
			return {
				SERVERS: SERVERS,
				setServer: setServer,
				getServer: getServer,
				setServerUrl: setServerUrl,
				getServerUrl: getServerUrl,
				getTableControl: getTableControl,
				progressSwal: progressSwal,
				errorSwal: errorSwal
			};


			function setServer(value) {
				server = value;
				localStorage.server = value;
				for (let key in SERVERS) {
					if (value === key) {
						setServerUrl(SERVERS[key]);
					}
				}
			}

			function getServer() {
				return server;
			}

			function setServerUrl(url) {
				serverUrl = url;
			}

			function getServerUrl() {
				return serverUrl;
			}

			function getTableControl() {
				return tableControl;
			}

			function progressSwal(title, text) {
				swal({
					showConfirmButton: false,
					allowEscapeKey: false,
					allowOutsideClick: false,
					width: 0,
					padding: 0,
				});
				$('#busyBar').removeClass('hide').addClass('active');
			}

			function errorSwal(erroMsg, stackTrace) {
				swal({
					title: "Error",
					html: "<span style='color: black'>An error occurred while processing the request, please try again later.</span>" +
					"<br>" +
					"<span style='color: black'>If problem persists, please send an email to " +
					"<a href='mailto:msundlana@gmail.com?Subject=Accounts%20Support' target='_top'>support.</a></span>",
					type: 'error',
					confirmButtonText: 'Show Detail',
					confirmButtonClass: 'btn btn-success',
					showCloseButton: true,
					allowOutsideClick: false,
					buttonsStyling: false,
					allowEscapeKey: false,
				}).then(function () {
					let errorTrace = '';
					if (stackTrace && angular.isArray(stackTrace)) {
						stackTrace.forEach(trace => {
							errorTrace = errorTrace + 'at ' + trace.className + '.' + trace.methodName + '(' + trace.fileName + ':' + trace.lineNumber + ') \n'
						})
					}
					swal({
						html: "<span class='text-danger font-bold m-b'>" + erroMsg + "</span><br>" +
						"<textarea rows='15' cols='50' style='resize: none' readonly>" + errorTrace + "</textarea> <br><br>" +
						"<span style='color: black'>Please send an email to " +
						"<a href='mailto:msundlana@gmail.com?Subject=Accounts%20Support&body=" + erroMsg +
						"' target='_top'>support</a> with the above stack trace.</span>",
						type: "error",
						showConfirmButton: false,
						showCloseButton: true,
						allowEscapeKey: false,
					})
				});
			}
		}]);
