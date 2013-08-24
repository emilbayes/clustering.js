module.exports = function(grunt) {
    'use strict';

    var clusteringBaseFiles = [
        'lib/setup.js',
        'lib/distance-metrics.js',
        'lib/initialization-methods.js',
        'lib/clustering-abstract.js'
    ];


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['lib/**/*.js'],
            options: {
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                files: {
                    'dist/k-means.js': clusteringBaseFiles.concat([
                        'lib/k-means.js'
                    ]),
                    'dist/k-medians.js': clusteringBaseFiles.concat([
                        'lib/k-means.js',
                        'lib/k-medians.js'
                    ]),
                    'dist/clustering.js': ['lib/setup.js', 'lib/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! Clustering.js v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy hh:mm") %> | ' +
                        '(c) 2013 - <%= grunt.template.today("yyyy") %> <%= pkg.author %> \n' +
                        'Copyright (c) 2013 - <%= grunt.template.today("yyyy") %> <%= pkg.author %> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n' +
                        '\n' +
                        'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n' +
                        '\n' +
                        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. \n' +
                        '*/\n\n'
            },
            /*dist: {
                'dist/main.min.js': '<%= concat.dist.dest %>'
            }*/
        },
        watch: {
            dev: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            dist: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'concat', 'uglify']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
}