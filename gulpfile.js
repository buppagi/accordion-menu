"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();
var reload = bs.reload;

var errorHandler = function (error) {
  console.error(error.message);
  this.emit('end');
};
var plumberOption = {
  errorHandler: errorHandler
};

gulp.task('server', function () {
  bs.init({
    server: { baseDir: "." },
    ghostMode: { clicks: false, scroll: false }
  });
});

gulp.task('js', function () {
  return gulp.src('./uncompressed/*.js')
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
    .pipe(jshint())
    .pipe(uglify({ mangle: { toplevel: true } }))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({
      dirname: "",
      suffix: ".min"
    }))
    .pipe(sourcemaps.write('./maps/js'))
    .pipe(gulp.dest('./minified'))
    .pipe(bs.reload({ stream: true }));
});

gulp.task('watch', function () {
  gulp.watch('./uncompressed/js/*.js', ['js']);
});

gulp.task('default', ['server', 'js']);
