'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // jshint ignore:line
var _ = require('lodash'); // jshint ignore:line

var paths = {
    sass: [
        './app/**/*.scss',
        '!./app/vendor/**/*.scss',

    ]
};

gulp.task('styles', function () {
    return gulp.src(paths.sass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['styles'], function() {
    $.watch(paths.sass, function () {
        gulp.start('styles');
    });
});