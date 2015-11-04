/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp     = require('gulp'),
browserSync  = require('browser-sync'),
slim         = require("gulp-slim"),
sass         = require('gulp-sass'),
plumber      = require('gulp-plumber'),
premailer    = require('gulp-premailer'),
autoprefixer = require('gulp-autoprefixer'),
rename       = require('gulp-rename'),
using        = require('gulp-using'),
clean        = require('gulp-clean');
// imgmin    = require('gulp-imagemin'),

// src & output
var  src = 'src/';
/*=================================
=            task init            =
=================================*/
// browser-sync task
gulp.task('browserSync',function () {
  browserSync({
    server: {
      baseDir: 'render'
    }
  })
})

// cp img folder
gulp.task('img', function() {
  return gulp.src([src+'**/images/*.{png,jpg,gif}'])
  // .pipe(npm())
  .pipe(gulp.dest('render'))
})

// sass task
gulp.task('sass', function() {
  return gulp.src(src+'**/scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename(function(path) {
    path.dirname += "/../css";
  }))
  .pipe(gulp.dest('render'))
  .pipe(using())
  .pipe(browserSync.reload({stream: true }));
})

// slim task
gulp.task('slim', function () {
  return gulp.src([src+'*.slim',src+'**/slim/*.slim'])
  .pipe(plumber())
  .pipe(slim({
    pretty: true
  }))
  .pipe(using())
  .pipe(gulp.dest('render')) // slim folder
  .pipe(rename(function(path) {
    path.dirname += "/../";
  }))
  .pipe(gulp.dest('render')) // html folder
  .pipe(browserSync.reload({
    stream: true
  }))
  // .on('finish', function() {
  //   console.log('finished');
  // })
});

// premailer task
gulp.task('premailer', function () {
  gulp.src('render/**/html/*.html')
  .pipe(premailer())
  .pipe(gulp.dest('render'));
});

// lancement > fonction watch
gulp.task('build',['browserSync','img','slim','sass','premailer'], function() {
  // gulp.watch( 'browserSync','slim', 'sass', 'imgs' );
  gulp.watch([src+'*.slim',src+'**/slim/*.slim',src+'**/**/*.slim',src+'**/*.slim'],['browserSync','slim','img','premailer']);
  gulp.watch(src+'**/scss/*.scss',['sass','premailer','slim']);
  // gulp.watch('render/**/slim/*.html',['premailer']);
});



// gulp.task('watch', ['browserSync', 'slim', 'sass'], function () {
//   gulp.watch('src/scss/*.scss',['sass']);
//   gulp.watch('src/**/*.slim',['slim']);
//   gulp.watch('render/html/index.html',['premailer']);
//   // BV
//   gulp.watch('src/BV/scss/*.scss',['sass2']);
//   gulp.watch('render/html/BV/index.html',['premailerBV']);
// })
