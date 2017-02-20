module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine',
			'jasmine-matchers'
    ],

    // list of files / patterns to load in the browser
    files: [
    	'node_modules/babel-polyfill/dist/polyfill.js',
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/metisMenu/dist/metisMenu.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/moment/moment.js',
      'bower_components/moment/min/moment-with-locales.js',
      'bower_components/pace/pace.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
      'bower_components/ng-i18n/dist/ng-i18n.js',
      'bower_components/ng-i18n/dist/ng-i18n.min.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-gettext/dist/angular-gettext.js',
      'bower_components/angular-auto-validate/dist/jcs-auto-validate.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/x2js/xml2json.min.js',
      'bower_components/slimScroll/jquery.slimscroll.min.js',
      'bower_components/bootstrap-table/dist/bootstrap-table.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-underscore-module/angular-underscore-module.js',
      'bower_components/toastr/toastr.js',
      'bower_components/ng-idle/angular-idle.js',
      'bower_components/es6-promise/es6-promise.js',
      'bower_components/sweetalert2/dist/sweetalert2.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
			'bower_components/bootstrap-table/dist/extensions/angular/bootstrap-table-angular.js',
			'app/libs/icbs-gui-libs.js',

      'app/**/*.js',
			'app/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
			// 'app/libs/inspinia-2.5/**/*.js'
    ],

    // web server port
    port: 8011,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

		// Code coverage report
		reporters: ['progress', 'html', 'junit', 'coverage'],
		preprocessors: {
			'app/!(libs)/**/!(*.spec)*.js': ['coverage', 'babel'],
			'app/**/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			moduleName: 'ietaTraderApp'
		},
		coverageReporter: {
			type: 'html',
			dir: 'coverage'
		},

		htmlReporter: {
			outputFile: 'reports/projectName_report.html',

			// Optional
			pageTitle: 'Lux: IETA',
			subPageTitle: 'Unit Tests'
		},

		junitReporter: {
			outputDir: 'reports', // results will be saved as $outputDir/$browserName.xml
			outputFile: 'projectName-junit', // if included, results will be saved as $outputDir/$browserName/$outputFile
			suite: '', // suite will become the package name attribute in xml testsuite element
			useBrowserName: false // add browser name to report and classes names
		},

    // Which plugins to enable
    plugins: [
			"karma-phantomjs-launcher",
			"karma-jasmine",
			'karma-coverage',
			'karma-ng-html2js-preprocessor',
			'karma-htmlfile-reporter',
			'karma-junit-reporter',
			'karma-jasmine-matchers',
			'karma-babel-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
