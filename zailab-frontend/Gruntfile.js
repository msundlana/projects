// Generated on 2015-04-30 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};
	var target = grunt.option('target') || 'dev';

	var modRewrite = require('connect-modrewrite');

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		accounts: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			babel: {
				files: [
					'<%= accounts.app %>/app.js',
					'<%= accounts.app %>/{modules,components,services,directives,filters}/**/!(*.spec|*.mock).js'
				],
				tasks: ['newer:babel:server']
			},
			injectJS: {
				files: [
					'<%= accounts.app %>/{modules,components,services,directives,filters}/**/*.js',
					'!<%= accounts.app %>/{modules,components,services,directives,filters}/**/*.spec.js',
					'!<%= accounts.app %>/{modules,components,services,directives,filters}/**/*.mock.js',
					'!<%= accounts.app %>/app.js'
				],
				tasks: ['injector:scripts']
			},
			jsTest: {
				files: [
					'<%= accounts.app %>/{modules,components,services,directives,filters}/**/*.{spec,mock}.js'
				],
				tasks: ['newer:jshint:test', 'karma']
			},
			styles: {
				files: ['<%= accounts.app %>/assets/css/*.css'],
				tasks: ['newer:copy:styles', 'postcss']
			},
			injectLess: {
				files: [
					// '<%= accounts.app %>/app.less',
					'<%= accounts.app %>/{modules,components,assets,directives}/**/*.less'
				],
				tasks: ['injector:less']
			},
			less: {
				files: [
					'<%= accounts.app %>/app.less',
					'<%= accounts.app %>/{modules,components,assets,directives}/**/*.less'
				],
				tasks: ['less', 'postcss']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				//tasks: ['less'],
				files: [
					'<%= accounts.app %>/{,*/}*.html',
					'<%= accounts.app %>/{,*/}*.js',
					'<%= accounts.app %>/{,*/}*.less',
					'{.tmp,<%= accounts.app %>}/{,*/}*.css',

					'{.tmp,<%= accounts.app %>}/{modules,components,directives,partials}/**/*.html',

					// '{.tmp,<%= accounts.app %>}/{modules,components,services,directives}/**/*.{css,html}',
					// '{.tmp,<%= accounts.app %>}/{modules,components,services,directives,filters}/**/!(*.spec|*.mock).js',

					'<%= accounts.app %>/{modules,components,directives}/{,**/}*.html',
					'<%= accounts.app %>/{modules,components,directives,filters}/{,**/}*.js',
					'<%= accounts.app %>/{modules,components,assets,directives}/{,**/}*.less',
					'!{.tmp,<%= accounts.app %>}/{modules,components,directives,filters}/{,**/}*.spec.js',
					'!{.tmp,<%= accounts.app %>}/{modules,components,directives,filters}/{,**/}*.mock.js',

					'<%= accounts.app %>/assets/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9900,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 38729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							function (req, res, next) {
								res.setHeader('Access-Control-Allow-Origin', '*');
								res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
								res.setHeader('Access-Control-Allow-Methods', '*');
								return next();
							},
							modRewrite(['^[^\\.]*$ /index.html [L]']),
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							/*connect().use(
							 '/app/styles',
							 connect.static('./app/styles')
							 ),*/
							connect().use(
								'/app/assets',
								connect.static('./app/assets')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9011,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= accounts.dist %>'
				}
			}
		},

		// Compiles Less to CSS
		less: {
			options: {
				sourceMap: true,
				sourceMapFileInline: true,
				paths: [
					// '<%= accounts.app %>/bower_components',
					'<%= accounts.app %>/',
					'<%= accounts.app %>/{modules,components,directives}'
				]
			},

			server: {
				files: {
					'.tmp/app.css': '<%= accounts.app %>/app.less'
				}
			}
		},

		injector: {
			// Inject application script files into index.html (doesn't include bower)
			scripts: {
				options: {
					transform: function (filePath) {
						filePath = filePath.replace('/app/', '');
						filePath = filePath.replace('/.tmp/', '');
						return '<script src="' + filePath + '"></script>';
					},
					/*sort: function(a, b) {
					 var module = /\.module\.(js|ts)$/;
					 var aMod = module.test(a);
					 var bMod = module.test(b);
					 // inject *.module.js first
					 return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
					 },*/
					starttag: '<!-- injector:js -->',
					endtag: '<!-- endinjector -->'
				},
				files: {
					'<%= accounts.app %>/index.html': [
						[
							'<%= accounts.app %>/{modules,components,services,directives,filters}/**/!(*.spec|*.mock).js',

							'!{.tmp,<%= accounts.app %>}/app.js'
							// '!{.tmp,<%= accounts.app %>}/{modules,components,services,directives,filters}/**/*.spec.js',
							// '!{.tmp,<%= accounts.app %>}/{modules,components,services,directives,filters}/**/*.mock.js'
						]
					]
				}
			},

			// Inject component less into app.less
			less: {
				options: {
					transform: function (filePath) {
						filePath = filePath.replace('/app/', '');
						filePath = filePath.replace('/modules/', '');
						filePath = filePath.replace('/components/', '');
						filePath = filePath.replace('/directives/', '');
						return '@import \'' + filePath + '\';';
					},
					starttag: '// injector',
					endtag: '// endinjector'
				},
				files: {
					'<%= accounts.app %>/app.less': [
						'<%= accounts.app %>/{modules,components,directives}/**/*.less',
						'!<%= accounts.app %>/app.less'
					]
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				force: true
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= accounts.app %>/scripts/{,*/}*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= accounts.dist %>/{,*/}*',
						'!<%= accounts.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp',
			test: ['.tmp', 'coverage', 'reports']
		},

		// Add vendor prefixed styles
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({browsers: ['last 2 version']})
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/',
					src: '{,*/}*.css',
					dest: '.tmp/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= accounts.app %>/index.html'],
				ignorePath: /\.\.\//,
				exclude: [
					/bootstrap.css/,
					/jquery.slimscroll.js/
				]
			},
			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath: /\.\.\//,
				fileTypes: {
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
						detect: {
							js: /'(.*\.js)'/gi
						},
						replace: {
							js: '\'{{filePath}}\','
						}
					}
				},
				exclude: [
					/bootstrap.css/,
					/jquery.slimscroll.js/
				]
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= accounts.dist %>/{,*/}*.{js,css}',
					'<%= accounts.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					// '<%= accounts.dist %>/fonts/*',
					// '<%= accounts.dist %>resources/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: ['<%= accounts.app %>/index.html'],
			options: {
				dest: '<%= accounts.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglify'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= accounts.dist %>/{,*/}*.html'],
			css: ['<%= accounts.dist %>/{,*/}*.css'],
			js: ['<%= accounts.dist %>/{,*/}*.js'],
			options: {
				assetsDirs: [
					'<%= accounts.dist %>',
					'<%= accounts.dist %>/assets/images',
					// '<%= accounts.dist %>/styles'
				],
				// This is so we update image references in our ng-templates
				patterns: {
					css: [
						[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the CSS to reference our revved images']
					],
					js: [
						[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
					]
				}
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		cssmin: {
			/*dist: {
			 files: {
			 '<%= accounts.dist %>/styles/main.css': [
			 '.tmp/styles/{,*!/}*.css'
			 ],
			 '<%= accounts.dist %>/styles/vendor.css': [
			 '.tmp/vendor.css'
			 ],
			 '<%= accounts.dist %>/styles/app.css': [
			 '.tmp/app.css'
			 ]
			 }
			 }*/
		},

		uglify: {
			options: {
				mangle: true,
				beautify: false
			},

		},
		concat: {
			dist: {}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= accounts.app %>/images',
					src: '{,*/}*.{ico,png,jpg,jpeg,gif}',
					dest: '<%= accounts.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= accounts.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= accounts.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
			options: {
				collapseWhitespace: true,
				conservativeCollapse: true,
				collapseBooleanAttributes: true,
				removeCommentsFromCDATA: true,
				removeOptionalTags: true,
				removeComments: true
			},
				files: [{
					expand: true,
					cwd: '<%= accounts.dist %>',
					src: '*.html',
					dest: '<%= accounts.dist %>'
				}]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat',
					src: '**/*.js',
					dest: '.tmp/concat'
				}]
			}
		},

		// Package all the html partials into a single javascript payload
		ngtemplates: {
			options: {
				// This should be the name of your apps angular module
				module: 'zailabAccountsApp',
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				usemin: 'scripts/scripts.js'
			},
			main: {
				cwd: '<%= accounts.app %>',
				src: ['{modules,components,directives,partials}/**/*.html'],
				dest: '.tmp/templates.js'
			},
			tmp: {
				cwd: '.tmp',
				src: ['{modules,components,directives,partials}/**/*.html'],
				dest: '.tmp/tmp-templates.js'
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= accounts.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= accounts.app %>',
					dest: '<%= accounts.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'assets/images/**/*',
						'assets/fonts/**/*',
						'resources/*',
						'userGuide/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= accounts.dist %>/assets/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: 'bower_components/fontawesome',
					src: 'fonts/*',
					dest: '<%= accounts.dist %>'
				}, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist',
					src: 'fonts/*',
					dest: '<%= accounts.dist %>'
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= accounts.app %>',
				dest: '.tmp/',
				src: ['app.css', 'assets/css/**', 'libs/**/*.css']
			},
			server: {
				dest: '.tmp/',
				src: ['libs/**/*']
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'newer:babel:server',
				'less',
				'copy:styles',
				'copy:server'
			],
			test: [
				'newer:babel:server',
				'less',
				'copy:styles'
			],
			dist: [
				'newer:babel:server',
				'less',
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		// Compiles ES6 to JavaScript using Babel
		babel: {
			options: {
				sourceMap: false,
				presets: ['es2015']
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= accounts.app %>',
					src: [
						'app.js',
						'{modules,components,services,directives,filters}/**/!(*.spec).js'
					],
					dest: '.tmp'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= accounts.app %>',
					src: [
						'app.js',
						'{modules,components,services,directives,filters}/**/!(*.spec).js'
					],
					dest: '<%= accounts.dist %>'
				}]
			}
		}
	});


	grunt.registerTask('live', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'injector',
			'wiredep:app',
			'concurrent:server',
			'postcss',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:test',
		'injector',
		'wiredep:test',
		'concurrent:test',
		'postcss',
		'connect:test',
		'babel:server',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'concurrent:dist',
		'injector',
		'wiredep:app',
		'useminPrepare',
		'postcss',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'babel:server',
		'cdnify',
		'cssmin',
		'uglify:generated',
		'filerev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		// 'test',
		'build'
	]);
};
