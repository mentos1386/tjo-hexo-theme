module.exports = function( grunt ) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        watch: {
            sass: {
                files: [
                    './source/_sass/**/*.sass',
                    './source/_sass/**/*.scss'
                ],
                tasks: [ 'sass', 'cssmin' ]
            },
            js: {
                files: [
                    './source/_js/**/*.js'
                ],
                tasks: [ 'jshint', 'babel', 'uglify' ]
            }
        },

        // CSS/SASS FILES
        sass: {
            dist: {
                options: {
                    lineNumbers: true,
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: './source/_sass',
                    src: [ '**/*.sass', '**/*.scss', '!modules/**/*.*'],
                    dest: './source/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: './source/css/',
                    src: [ '*.css', '!*.min.css' ], // 1
                    dest: './source/css/',
                    ext: '.min.css'
                }]
            }
        },

        // JAVASCRIPT FILES
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './source/_js',
                    src: [ '**/*.js', '!modules/**/*.*'],
                    dest: './source/js',
                    ext: '.js'
                }]
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'source/_js/**/*.js'],
            options: {
                esversion: 6
            }
        },
        uglify: {
            my_target: {
                files: {
                    './source/js/main.min.js': './source/js/main.js'
                }
            }
        },

        // DEPENDENCY MANAGEMENT
        gitclone: {
            Materialicons: {
                options: {
                    repository: 'https://github.com/google/material-design-icons.git',
                    directory: 'tmp/material-design-icons'
                }
            },
            normalize: {
                options: {
                    repository: 'https://github.com/necolas/normalize.css.git',
                    directory: 'tmp/normalize'
                }
            },
            pixi: {
                options: {
                    repository: 'https://github.com/pixijs/pixi.js.git',
                    directory: 'tmp/pixi'
                }
            },
            tether: {
                options: {
                    repository: 'https://github.com/HubSpot/tether.git',
                    directory: 'tmp/tether'
                }
            }
        },
        copy: {
            Materialicons_fonts: {
                expand: true,
                cwd: 'tmp/material-design-icons/iconfont/',
                src: ['*.ijmap', '*.svg', '*.ttf', '*.eot', '*.woff', '*.woff2'],
                dest: 'source/fonts/'
            },
            normalize: {
                expand: true,
                cwd: 'tmp/normalize/',
                src: ['normalize.css'],
                dest: 'source/css/'
            },
            pixi: {
                expand: true,
                cwd: 'tmp/pixi/bin',
                src: ['*.js'],
                dest: 'source/js/'
            },
            tether: {
                expand: true,
                cwd: 'tmp/tether/dist/js',
                src: ['**'],
                dest: 'source/js/'
            }
        },
        clean: {
            tmp: ['tmp']
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('init', ['gitclone', 'copy', 'clean:tmp', 'sass', 'cssmin', 'babel']);
};