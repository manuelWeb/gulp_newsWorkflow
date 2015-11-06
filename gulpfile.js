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
rm           = require('gulp-rimraf'),
clean        = require('gulp-clean');
// imgmin    = require('gulp-imagemin'),

// src & output
var  src = 'src/';
/*=================================
=            task init            =
=================================*/
// browser-sync task !attention il faut un index.html obligatoire
gulp.task('browserSync',function () {
  browserSync({
    server: {
      baseDir: 'render/NL'
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
  return gulp.src([src+'**/slim/*.slim']) // src+'*.slim', // pas de fichier sur :root
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
// premailer task // TODO attention si erreur sass > rendu incomplet à gérer
gulp.task('premailer', function () {
  gulp.src('render/**/*.html')
  .pipe(plumber())
  .pipe(premailer())
  .pipe(gulp.dest('render'));
});
// init 7.8 sc...
gulp.task('init',function () {
  // gulp.start(['premailer']);
  gulp.start(['img','slim','sass']);
  console.log('maintenant !!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // gulp.start('test');
});
// gulp.task('test', function(){
//   gulp.src('render/**/slim')
//   .pipe(rm())
//   .on('finish', function(e) {
//     gulp.start('premailer')
//     console.log(e); })
//   // gulp.run(['premailer']);
// })

// lancement > fonction watch
gulp.task('dev',['browserSync','img','slim','sass','premailer'], function() {
  // src+'*.slim', ,src+'**/*.slim' // pas de fichier sur :root
  gulp.watch([src+'**/slim/*.slim',src+'**/**/*.slim'],['browserSync','slim','img','premailer']);
  gulp.watch(src+'**/scss/*.scss',['sass','premailer','slim']);
  gulp.start("init");
});
