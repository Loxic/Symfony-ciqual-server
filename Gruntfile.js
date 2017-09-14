'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {
            css: {
                files: [
                    'app/Resources/css/*.styl',
                    'app/Resources/css/fragments/*.styl',
                    'src/*/Resources/css/**.styl'
                ],
                tasks: ['stylus']
            },
            javascript: {
                files: [
                    'app/Resources/js/lib/*.*',
                    'src/*/Resources/js/*.js',
                    'web/assets/js/*.js'
                ],
                tasks: ['uglify:dev']
            },
            react: {
                files: [
                    'app/Resources/js/src/components/*.*',
                    'app/Resources/js/src/*.*'
                ],
                tasks: ['browserify:dev']
            },
            helper: {
                files: 'src/HelperBundle/Resources/js/src/*.js',
                tasks: ['uglify:helper']
            },
            embed: {
                files: 'web/assets/embed/index.js',
                tasks: ['uglify:embed']
            }
        },

        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: [['babelify', { presets: ['es2015', 'react'] }]]
                },
                files: {
                    'app/Resources/js/lib/app.js': 'app/Resources/js/src/**.*'
                }
            },
            build: {
                options: {
                    debug: false,
                    transform: [['babelify', { presets: ['es2015', 'react'] }]]
                },
                files: {
                    'app/Resources/js/lib/app.js': 'app/Resources/js/src/**.*'
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'app/Resources/js/lib/app.js': 'app/Resources/js/src/*.*'
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    'web/built/app.css': 'app/Resources/css/app.styl',
                    'web/built/adsbanner.css' : 'app/Resources/css/adsbanner.styl',
                    'web/built/bundle.css': 'src/*/Resources/css/*.styl',
                    'web/built/admin.css' : 'app/Resources/css/admin.styl'
                }
            }
        },

        uglify: {
            dev: {
                options: { sourceMap: false },
                files: {
                    'web/built/app.react.min.js' : ['app/Resources/js/lib/*.js'],
                    'web/built/app.min.js': [
                        'src/*/Resources/js/*.js',
                        'web/assets/js/*.js'
                    ]
                }
            },
            helper: {
                files : [{
                    expand: true,
                    cwd: 'src/HelperBundle/Resources/js/src',
                    src: '*.js',
                    dest: 'web/built/helper',
                    ext: '.min.js'
                }]
            },
            embed: {
                files : {
                    'web/built/embed.js' : 'web/assets/embed/index.js'
                }
                    
            },
            prod: {
                options: {
                    sourceMap: false,
                    compress : {
                        drop_console : true
                    }
                },
                files: {
                    'web/built/app.react.min.js' : ['app/Resources/js/lib/*.js'],
                    'web/built/app.min.js': [
                        'src/*/Resources/js/*.js',
                        'web/assets/js/*.js'
                    ]
                }
            }
        },

        postcss: {
            options: { processors: [ require('autoprefixer')({browsers: '> 1%'}) ] },
            dist: { src: 'web/built/*.css' }
        },

        cssmin: {
            target: {
                files: {
                    "web/built/app.css" : "web/built/app.css",
                    "web/built/admin.css" : "web/built/admin.css",
                    "web/built/bundle.css" : "web/built/bundle.css",
                }
            }
        }

    });

    grunt.registerTask('default', ['stylus']);

    grunt.registerTask('run', [
        'stylus',
        'watch'
    ]);

    grunt.registerTask('run:react', [
        'stylus',
        'browserify:dev',
        'uglify:dev',
        'uglify:helper',
        'uglify:embed',
        'watch'
    ]);

    grunt.registerTask('compile:dev', [
        'stylus',
        'browserify:dev',
        'uglify:dev',
        'uglify:helper',
        'uglify:embed'
    ]);

    grunt.registerTask('compile:prod', [
        'stylus',
        'browserify:build',
        'uglify:prod',
        'uglify:helper',
        'uglify:embed',
        'postcss',
        'cssmin'
    ]);

};
