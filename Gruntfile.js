//- publication des executable vers 1110.fr/[nom]
//- lancement des tests automatiques
module.exports = function(grunt) {
    grunt.initConfig({


        pkg: grunt.file.readJSON('package.json'),


        /* !WATCH */
        watch: {
            scss: {
                files: ['src/scss/*'],
                tasks: ['sass:watch', 'csslint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/index.html','src/templates/*.html'],
                tasks: ['copy:build'],
                options: {
                    livereload: true
                }
            },
            img: {
                files: ['src/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin:watch'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'uglify:watch'],
                options: {
                    livereload: true
                }
            }
        },


        /* !EXEC */
        exec: {
            clean: {
                command: 'sudo chmod -R a+rw *',
                stdout: true,
                stderr: true
            },
            init: {
                command: 'sudo npm update;bower install ionic#1 --allow-root;sudo ionic platform add ios;sudo ionic platform add android;sudo ionic platform add firefoxos;',
                stdout: true,
                stderr: true
            },
            build: {
                command: 'sudo chmod -R a+rw *',
                stdout: true,
                stderr: true
            },
            buildios: {
                command: 'sudo ionic build ios',
                stdout: true,
                stderr: true
            },
            buildandroid: {
                command: 'sudo ionic build android',
                stdout: true,
                stderr: true
            },
            buildff: {
                command: 'sudo ionic build firefoxos',
                stdout: true,
                stderr: true
            },
            runios: {
                command: 'sudo ionic emulate ios',
                stdout: false,
                stderr: false
            },
            runandroid: {
                command: 'android -avd ionic;sudo ionic emulate android',
                stdout: false,
                stderr: false
            }
        },


        /* !SASS */
        sass: {
            watch: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'www/css/style.css': 'src/scss/style.scss',
                    'merges/ios/css/override.css': 'src/scss/ios.scss',
                    'merges/android/css/override.css': 'src/scss/android.scss',
                    'merges/firefoxos/css/override.css': 'src/scss/ff.scss',
                }
            },
            build: {
                options: {
                    style: 'compressed',
                    noCache: true,
                },
                files: {
                    'www/css/style.css': 'src/scss/style.scss',
                    'merges/ios/css/override.css': 'src/scss/ios.scss',
                    'merges/android/css/override.css': 'src/scss/android.scss',
                    'merges/firefoxos/css/override.css': 'src/scss/ff.scss',
                }
            },
            start: {
                options: {
                    style: 'compressed',
                    noCache: true,
                },
                files: {
                    'www/css/style.css': 'src/scss/style.scss',
                    'merges/ios/css/override.css': 'src/scss/ios.scss',
                    'merges/android/css/override.css': 'src/scss/android.scss',
                    'merges/firefoxos/css/override.css': 'src/scss/ff.scss',
                }
            }
        },


        /* !CSS LINT */
        csslint: {
            options: {
                import: 2
            },
            src: ['www/css/style.css','merges/ios/css/override.css','merges/android/css/override.css','merges/firefoxos/css/override.css']
        },


        /* !JS LINT */
        jshint: {
        	src: ['src/*.js']
        },


        /* !REPLACE */
        /*
    "name": "Bank in the Pocket",
    "code": "bankinthepocket",
    "description": "Application de gestion bancaire",
    "version": "2.1.0",
    "author": "Pierre Canthelou",
        */
        replace: {
            start1: {
                src: ['1/index.html'],
                dest: 'src/index.html',
                replacements: [{
                    from: 'Starter App',
                    to: '<%= pkg.title %>'
                },{
                    from: 'starter',
                    to: '<%= pkg.name %>'
                }]
            },
            start2: {
                src: ['1/js/*.js'],
                dest : ['src/js/'],
                replacements: [{
                    from: 'starter',
                    to: '<%= pkg.name %>'
                }]
            },
            start3: {
                src: ['1/config.xml'],
                dest: ['config.xml'],
                replacements: [{
                    from: /version="([^"]+)"/g,
                    to: 'version="<%= pkg.version %>"'
                },{
                    from: /<name>(.*)<\/name>/g,
                    to: '<name><%= pkg.title %></name>'
                },{
                    from: /<description>(.*)<\/description>/g,
                    to: '<description><%= pkg.description %></description>'
                }]
            },
            start4: {
                src: ['1/manifest.webapp'],
                dest: ['merges/firefoxos/manifest.webapp'],
                replacements: [{
                    from: /"version": "([^"]+)"/g,
                    to: '"version": "<%= pkg.version %>"'
                },{
                    from: /"name": "([^"]+)"/g,
                    to: '"name": "<%= pkg.title %>"'
                },{
                    from: /"description": "([^"]+)"/g,
                    to: '"description": "<%= pkg.description %>"'
                }]
            },
            start5: {
                src: ['ionic.project'],
                overwrite: true,
                replacements: [{
                    from: /"name": "([^"]+)",/g,
                    to: '"name": "<%= pkg.title %>"'
                },{
                    from: /"app_id": "([^"]+)"/g,
                    to: '"app_id": "<%= pkg.name %>"'
                }]
            },
            version: {
                src: ['config.xml'],
                overwrite: true,
                replacements: [{
                    from: /version="([^"]+)"/g,
                    to: 'version="<%= pkg.version %>"'
                }]
            }
        },


        /* !UGLIFY */
        uglify: {
            watch: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    'www/js/app.min.js': ['src/js/app.js', 'src/js/controllers.js', 'src/js/services.js', 'src/js/directives.js']
                }
            },
            build: {
                options: {
                    mangle: false,
                    compress: true,
                    beautify: false
                },
                files: {
                    'www/js/app.min.js': ['src/js/app.js', 'src/js/controllers.js', 'src/js/services.js', 'src/js/directives.js']
                }
            }
        },


        /* !IMAGE MIN */
        imagemin: {
            watch: {
                options: {                       // Target options
                    optimizationLevel: 0,
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'www/img/'
                }]
            },
            build: {
                options: {                       // Target options
                    optimizationLevel: 7,
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'www/img/'
                }]
            }
        },


        /* !COPY */
        copy: {
            start: {
                files: [{
                    expand: true,
                    src: ['src/*.html'],
                    flatten: true,
                    dest: 'www/'
                }, {
                    expand: true,
                    src: ['src/templates/*.html'],
                    flatten: true,
                    dest: 'www/templates/'
                }, {
                    expand: true,
                    cwd: 'src/res/',
                    src: ['**/*'],
                    dest: 'www/res/'
                }]
            },
            init: {
                files: [{
                    expand: true,
                    cwd: '1/img',
                    src: ['*'],
                    dest: 'src/img/'
                }, {
                    expand: true,
                    src: ['1/templates/*'],
                    flatten: true,
                    dest: 'src/templates/'
                }, {
                    expand: true,
                    src: ['1/scss/*'],
                    flatten: true,
                    dest: 'src/scss/'
                }, {
                    expand: true,
                    cwd: 'bower_components/ionic/release/',
                    src: ['**/*'],
                    dest: '1/lib/ionic/'
                }, {
                    expand: true,
                    src: ['bower_components/ionic/scss/**/*'],
                    flatten: true,
                    dest: '1/lib/ionic/scss/'
                }, {
                    expand: true,
                    cwd: '1/lib/',
                    src: ['**/*'],
                    dest: 'www/lib/'
                }, {
                    expand: true,
                    cwd: 'src/res/',
                    src: ['**/*'],
                    dest: 'www/res/'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    src: ['src/*.html'],
                    flatten: true,
                    dest: 'www/'
                }, {
                    expand: true,
                    src: ['src/templates/*.html'],
                    flatten: true,
                    dest: 'www/templates/'
                }]
            }
        },

        /* RESPONSIVE IMAGE */
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
                    src: ['icon.png'],
                    cwd: '1/',
                    dest: 'src/res/icons/android/'
                }]
            },
            android_splashscreens: {
                options: {
                    sizes: [{
                      width: 320,
                      height: 426,
                      aspectRatio: false,
                      name: 'ldpi-portrait'
                    },{
                      width: 426,
                      height: 320,
                      aspectRatio: false,
                      name: 'ldpi-landscape'
                    },{
                      width: 320,
                      height: 470,
                      aspectRatio: false,
                      name: 'mdpi-portrait'
                    },{
                      width: 470,
                      height: 320,
                      aspectRatio: false,
                      name: 'mdpi-landscape'
                    },{
                      width: 480,
                      height: 640,
                      aspectRatio: false,
                      name: 'hdpi-portrait'
                    },{
                      width: 640,
                      height: 480,
                      aspectRatio: false,
                      name: 'hdpi-landscape'
                    },{
                      width: 720,
                      height: 960,
                      aspectRatio: false,
                      name: 'xhdpi-portrait'
                    },{
                      width: 960,
                      height: 720,
                      aspectRatio: false,
                      name: 'xhdpi-landscape'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['screen.png'],
                    cwd: '1/',
                    dest: 'src/res/screens/android/'
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
                src: ['icon.png'],
                cwd: '1/',
                dest: 'src/res/icons/firefoxos/'
              }]
            },
            firefoxos_splashscreens: {
              options: {
                sizes: [{
                  width: 320,
                  height: 480,
                  aspectRatio: false
                }]
              },
              files: [{
                expand: true,
                src: ['screen.png'],
                cwd: '1/',
                dest: 'src/res/screens/firefoxos/'
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
                src: ['icon.png'],
                cwd: '1/',
                dest: 'src/res/icons/ios/'
              }]
            },
            ios_splashscreens: {
                options: {
                    sizes: [{
                      width: 320,
                      height: 480,
                      aspectRatio: false,
                      name: 'iphone-portrait'
                    },{
                      width: 640,
                      height: 960,
                      aspectRatio: false,
                      name: 'iphone-portrait-2x'
                    },{
                      width: 640,
                      height: 1136,
                      aspectRatio: false,
                      name: 'iphone-portrait-568h'
                    },{
                      width: 1280,
                      height: 2272,
                      aspectRatio: false,
                      name: 'iphone-portrait-568h-2x'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['screen.png'],
                    cwd: '1/',
                    dest: 'src/res/screens/ios/'
                }]
            },
        },

        /* !COMPRESS */
        compress: {
            all: {
                options: {
                    archive: '../../<%= pkg.name %>.all.<%= pkg.version %>.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['**/*'],
                    }
                ]
            },
            src: {
                options: {
                    archive: '../../<%= pkg.name %>.src.<%= pkg.version %>.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['config.xml','hooks/**/*','ionic.project','merges/**/*','package.json','plugins/**/*','res/**/*','src/**/*']
                    }
                ]
            }
        },



        /* !CLEAN */
        clean: {
            uninstall: ['www/*','src/*','1/lib/ionic','platforms','bower_components','config.xml','merges/*','res/*'],
            install: ['bower_components'],
            default: ['www/*','src/*']
        }
    });


    /* !LOAD PLUGINS */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-text-replace');


    /* !REGISTER TASKS */
    grunt.registerTask('install', ['replace','exec:init','responsive_images','copy:init','clean:install','sass:start','compile','build']);
    grunt.registerTask('default', ['copy:start', 'sass:start', 'watch']);

    grunt.registerTask('save', ['compile','build','compress:all','compress:src']);
    grunt.registerTask('compile', ['exec:build', 'replace:version', 'copy:start', 'sass:build', 'imagemin:build', 'uglify:build', 'copy:start']);
    grunt.registerTask('build', ['exec:buildios','exec:buildandroid','exec:buildff']);
    grunt.registerTask('run', ['exec:runios','exec:runandroid']);

    grunt.registerTask('cleanall', ['clean:default']);
    grunt.registerTask('uninstall', ['exec:clean','clean:uninstall']);

    grunt.registerTask('test', ['responsive_images']);
}