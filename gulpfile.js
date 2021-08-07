/**************** 환경설정 ****************/


// 모듈
const { src, dest, task, watch, series, parallel } = require('gulp');
const del = require('del');
const options = require('./package.json').options;
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

task('livepreview', (done) => {
  browserSync.init({
    port: 8024,
    server: { baseDir: "./"},
    ghostMode: { clicks: false, scroll: false }
  });
  done();
});

function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Preview.\n");
  browserSync.reload();
  done();
}

// Error
const onError = (error) => {
  console.log([error.message, error.plugin]);
};

const plumberOption = {
  errorHandler: onError
};

task('scripts', function (done) {
  return src('./uncompressed/*.js')
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
  done();
});
task('watch-changes', (done) => {
    watch(options.paths.src.js + '/**/*.js', series('scripts', previewReload));
    done();
});

task('development', series('scripts'), (done) => {
  console.log("\n\t" + logSymbols.info, "npm run dev is complete. Files are located at ./dist\n");
  done();
});

exports.default = series('development', 'livepreview', 'watch-changes');