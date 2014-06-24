module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

        /* MISE À JOUR DES PACKAGES CONTENUS DANS PACKAGE.JSON */
        devUpdate: {
            options: {
                updateType: 'report', //just report outdated packages
                reportUpdated: false, //don't report already updated packages
                semver: true, //use package.json semver rules when updating
                packages: { //what packages to check
                    devDependencies: true, //only devDependencies
                    dependencies: false
                },
                packageJson: null //find package.json automatically
            }
        },

		/* AUTOMATISATION */
		watch: {
    		//all: {
    		//  options: { livereload: true, spawn: false },
    		//  files: ['source/**/*']
    		//},
    		html: {
    		    files: ['src/**/*.html'],
    		    tasks: ['copy'],
    		    options: {
    		        livereload: true
    		    }
    		},
    		img: {
    		    files: ['src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.gif'],
    		    tasks: ['imagemin:dev'],
    		    options: {
    		        livereload: true
    		    }
    		},
    		js: {
    		    files: ['src/**/*.js'],
    		    tasks: ['jshint'/*, 'concat.dev'*/, 'uglify:dev'],
    		    options: {
    		        livereload: true
    		    }
    		},
    		scss: {
    		    files: ['src/**/*.scss'],
    		    tasks: ['sass:dev'/*, 'csslint'*/],
    		    options: {
    		        livereload: true
    		    }
    		}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				background: true
			}
		},

		/* TRANSFORMATION DU CODE */
		sass: {
			dev: {
                options: {                       // Target options
                    style: 'expanded'
                },
                    files: {                         // Dictionary of files
                    'www/css/style.css': 'src/scss/style.scss'//,       // 'destination': 'source'
                    //'widgets.css': 'widgets.scss'
                }
			},
			build: {
			    options: {
			        style: 'compressed',
			        noCache: true,
			        banner: '/*! <%= pkg.appname %> version <%= pkg.appversion %> */\n',
			    },
			    files: {
			        'src/<%= pkg.appname %>.scss': ['build/css/<%= pkg.appname %>.css']
			    }
			}
		},

		/* VERIFICATION DU CODE */
		jshint: {
			src: ['src/**/*.js']
		},
		csslint: {
            dev: {
                options: {
                    import: 2
                },
                src: ['www/css/style.css']
            },
            build: {
                options: {
                    import: 2
                },
                src: ['build/css/style.css']
            }
		},

      	/* MISE EN FORME DES FICHIERS */
        //concat: {
        //    options: {
        //        stripBanners: true,
        //        banner: '/*! <%= pkg.appname %> version <%= pkg.appversion %> concatened */\n',
        //    },
        //    dev: {
        //        src: ['src/**/*.js'],
        //        dest: 'dev/js/<%= pkg.appname %>.js'
        //    },
        //    build: {
        //        src: ['src/**/*.js'],
        //        dest: 'build/js/<%= pkg.appname %>.js'
        //    }
        //},
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    //'www/js/output.min.js': ['src/**/*.js']
                    'www/js/output.min.js': ['src/js/app.js', 'src/js/controllers.js', 'src/js/services.js', 'src/js/directives.js', 'src/js/calculs.js']
                }
            },
            build: {
                options: {
                    mangle: false,
                    compress: true,
                    beautify: false
                },
                files: {
                    //'www/js/output.min.js': ['src/**/*.js']
                    'www/js/output.min.js': ['src/js/app.js', 'src/js/controllers.js', 'src/js/services.js', 'src/js/directives.js', 'src/js/calculs.js']
                }
            }
        },
        /*uglify: {
            options: {
              mangle: false
            },
            my_target: {
              files: {
                'dest/output.min.js': ['src/input.js']
              }
            }
        },*/
        autoprefixer: {
            dev: {
                src: 'dev/css/<%= pkg.appname %>.css',
            },
            build: {
                src: 'build/css/<%= pkg.appname %>.css',
            }
        },
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'www/img/'
                }]
            },
            build: {
                dynamic: {
                  files: [{
                    expand: true,
                    cwd: '/src/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: '/www/img/'
                  }]
                }
            }
        },
        copy: {
            dev : {
                files: [
                     {expand: true, src: ['src/*.html'], flatten: true, dest: 'www/'},
                     {expand: true, src: ['src/templates/*.html'], flatten: true, dest: 'www/templates/'}
                ]
            },
            build: {
                files: [
                     {expand: true, src: ['src/*.html'], flatten: true, dest: 'www/'},
                     {expand: true, src: ['src/templates/*.html'], flatten: true, dest: 'www/templates/'}
                ]
            }
        },

        // icons & splash screens generator
        // don't forget to get res/bigicon.png (>= 1024*1024) & res/bigsplash.png (>= 640*1136)
        responsive_images: {
            android_icons: {
                options: {
                    sizes: [{
                      width: 36,
                      name: 'ldpi'
                    },{
                      width: 48,
                      name: 'mdpi'
                    },{
                      width: 72,
                      name: 'hdpi'
                    },{
                      width: 96,
                      name: 'xhdpi'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['bigicon.png'],
                    cwd: 'res/',
                    dest: 'res/android/icons'
                }]
            },
            android_splashscreens: {
                options: {
                    sizes: [{
                      width: 320,
                      height: 426,
                      aspectRatio: false,
                      name: 'ldpi'
                    },{
                      width: 320,
                      height: 470,
                      aspectRatio: false,
                      name: 'mdpi'
                    },{
                      width: 480,
                      height: 640,
                      aspectRatio: false,
                      name: 'hdpi'
                    },{
                      width: 720,
                      height: 960,
                      aspectRatio: false,
                      name: 'xhdpi'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['bigsplash.png'],
                    cwd: 'res/',
                    dest: 'res/android/splashs'
                }]
            },
            firefoxos_icons: {
              options: {
                sizes: [{
                  width: 30,
                },{
                  width: 60,
                },{
                  width: 128
                }]
              },
              files: [{
                expand: true,
                src: ['bigicon.png'],
                cwd: 'res/',
                dest: 'res/firefoxos/icons'
              }]
            },
            firefoxos_splashscreens: {
              options: {
                sizes: [{
                  width: 320,
                  aspectRatio: false,
                  height: 480
                }/*,{
                  width: 500,
                  aspectRatio: false,
                  height: 800
                }*/]
              },
              files: [{
                expand: true,
                src: ['bigsplash.png'],
                cwd: 'res/',
                dest: 'res/firefoxos/splashs'
              }]
            },
            ios_icons: {
              options: {
                sizes: [{
                  width: 29,
                  name: 'small'
                },{
                  width: 58,
                  name: 'small',
                  suffix: "@x2"
                },{
                  width: 40,
                  name: '40'
                },{
                  width: 80,
                  name: '40',
                  suffix: "@x2"
                },{
                  width: 50,
                  name: '50'
                },{
                  width: 100,
                  name: '50',
                  suffix: "@x2"
                },{
                  width: 57,
                  name: 'basic'
                },{
                  width: 114,
                  name: 'basic',
                  suffix: "@x2"
                },{
                  width: 60,
                  name: '60'
                },{
                  width: 120,
                  name: '60',
                  suffix: "@x2"
                },{
                  width: 72,
                  name: '72'
                },{
                  width: 144,
                  name: '72',
                  suffix: "@x2"
                },{
                  width: 76,
                  name: '76'
                },{
                  width: 152,
                  name: '76',
                  suffix: "@x2"
                }]
              },
              files: [{
                expand: true,
                src: ['bigicon.png'],
                cwd: 'res/',
                dest: 'res/ios/icons'
              }]
            },
            ios_splashscreens: {
                options: {
                    sizes: [{
                      width: 320,
                      height: 480,
                      aspectRatio: false,
                      name: 'default'
                    },{
                      width: 640,
                      height: 960,
                      aspectRatio: false,
                      name: 'default@2x'
                    },{
                      width: 640,
                      height: 1136,
                      aspectRatio: false,
                      name: 'default-568h@2x'
                    },{
                      width: 1280,
                      height: 2272,
                      aspectRatio: false,
                      name: 'portrait@2x'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['bigsplash.png'],
                    cwd: 'res/',
                    dest: 'res/ios/splashs'
                }]
            },
        },

/*main: {
    files: [
      // includes files within path
      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

      // includes files within path and its sub-directories
      {expand: true, src: ['path/**'], dest: 'dest/'},

      // makes all src relative to cwd
      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

      // flattens results to a single level
      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
    ]
  } */

        compress: {
            build: {
                options: {
                    archive: '<%= pkg.appname %>.src.<%= pkg.appversion %>.zip'
                },
                files: [
                     {expand: true, src: ['src/**'], dest: '.'}
                ]
            },
            package: {
                options: {
                    archive: '<%= pkg.appname %>.<%= pkg.appversion %>.zip'
                },
                files: [
                     {expand: true, src: ['build/**'], dest: '.'}
                ]
            }
        },
        'ftp-deploy': {
			build: {
				auth: {
				  host: 'server.com',
				  port: 21,
				  authKey: 'key1' // .ftppass
				},
				src: 'path/to/source/folder',
				dest: '/path/to/destination/folder',
				exclusions: ['build/**/.DS_Store', 'build/**/Thumbs.db', 'build/**/*.git*']
			}
		},

        /* NETTOYAGE */
        clean: ['build/js', 'build/css', 'build/img']

	});

	grunt.registerTask('default', ['devUpdate', 'watch']);
    grunt.registerTask('dev', [/*'watch',*/ 'sass', 'jshint', /*'csslint',*/ /*'concat',*/ 'autoprefixer', 'uglify', 'imagemin']);
    grunt.registerTask('build', ['sass', /*'concat', */'autoprefixer', 'uglify', 'imagemin', 'compress','ftp-deploy']);
    grunt.registerTask('clean', ['clean']);

}

/*

	TODO
	----
    files deleting
    livereload deleting in build mode
    karma tests
	start a http server
	launch chrome in a particular URL
	download a mysql database
	launch a xcode compilation
	modify version number
	launch a java compile

*/