module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true,
                    sourceMap: true,
                    sourceMapFilename: 'pub/css/styles.css.map',
                    sourceMapURL: 'styles.css.map',
                    sourceMapBasepath: 'pub',
                    sourceMapRootpath: '/'
                },
                files: {
                    'pub/css/styles.css': 'assets/dist/less/styles.less'
                }
            },
            prod: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true
                },
                files: {
                    'assets/dist/css/styles.css': 'assets/dist/less/styles.less'
                }
            }
        },

        cssmin: {
            options: {
                sourceMap: true,
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'pub/css/styles.min.css': [
                        'assets/dist/css/styles-processed.css'
                    ]
                }
            }
        },

        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions', 'ie 11']
                        })
                    ]
                },
                src: 'pub/css/styles.css',
                dest: 'pub/css/styles.min.css'
            },

            prod: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserlist: ['last 2 versions', 'ie 11']
                        })
                    ]
                },
                dist: {
                    src: 'assets/dist/css/styles.css',
                    dest: 'assets/dist/css/styles-processed.css'
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/dist/images/',
                    src: ['**/*.{png,jpg,jpeg,gif,svg}'],
                    dest: 'pub/images'
                }]
            }
        },

        watch: {
            less: {
                files: ['assets/dist/less/**/*.less'],
                tasks: ['less:dev', 'postcss:dev']
            },
            css: {
                files: ['pub/css/*.min.css'],
                options: {
                    livereload: true
                }
            },
            imagemin: {
                files: ['assets/dist/images/**/*.{png,jpg,jpeg,gif,svg}'],
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less:prod', 'postcss:prod', 'cssmin', 'imagemin']);
    grunt.registerTask('dev', ['less:dev', 'postcss:dev', 'imagemin', 'watch'])
};
