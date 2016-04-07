'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

function browserSyncInit(baseDir, files, browser, port) {
    var routes = null;

    browser = browser === undefined ? 'default' : browser;
    port = port === undefined ? 3000 : port;

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: baseDir
        },
        files: files,
        port: port,
        browser: browser
    });
}

gulp.task('serve', ['watch'], function() {
  browserSyncInit([
      'app'
  ], [
      'app/index.html',
      'app/**/*.css',
      'app/**/*.html',
      'app/**/*.js',
      '!app/vendor/**/*.html',
      '!app/vendor/**/*.js',
      '!app/vendor/**/*.css'
  ]);

});
