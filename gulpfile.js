/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp    = require('gulp'),
browserSync = require('browser-sync'),
slim        = require("gulp-slim"),
sass        = require('gulp-sass'),
premailer   = require('gulp-premailer'),
rename      = require('gulp-rename'),
using       = require('gulp-using'),
clean       = require('gulp-clean');
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
      baseDir: 'render/BV'
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
  .pipe(sass())
  .pipe(rename(function(path) {
    path.dirname += "/../css";
  }))
  .pipe(gulp.dest('render'))
  .pipe(using())
  // .pipe(browserSync.reload({
  //   stream: true
  // }))
})

// slim task
gulp.task('slim', function () {
  return gulp.src(src+'**/slim/*.slim')
  .pipe(slim({
    pretty: true
  }))
  .pipe(using())
  .pipe(gulp.dest('render')) // slim folder
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe(rename(function(path) {
    path.dirname += "/../";
  }))
  .pipe(gulp.dest('render')) // html folder
});

// premailer task
gulp.task('premailer', function () {
  gulp.src('render/**/html/*.html')
  .pipe(premailer())
  .pipe(gulp.dest('render'));
});

// lancement > fonction watch
gulp.task( 'build',['browserSync','img','slim','sass','premailer'], function() {
  // gulp.watch( 'browserSync','slim', 'sass', 'imgs' );
  gulp.watch(src+'**/slim/*.slim',['slim','img','premailer']);
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
