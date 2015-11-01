/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/

/*----------  dependance  > package.json > node_modules  ----------*/
var gulp    = require('gulp'),
browserSync = require('browser-sync'),
dest        = require('gulp-dest'),
slim        = require("gulp-slim"),
sass        = require('gulp-sass'),
premailer   = require('gulp-premailer'),
path        = require('path'),
fs          = require('fs'),
rename      = require('gulp-rename'),
using       = require('gulp-using'),
clean       = require('gulp-clean');
// imgmin    = require('gulp-imagemin'),

// var dist = ( 'dist/' );
// source and distribution folders
var  src = 'src/';
var dist = path.resolve( 'render/' );
/*=================================
=            task init            =
=================================*/

// browser-sync task
// gulp.task('browserSync',function () {
//   browserSync({
//     server: {
//       baseDir: 'render/BV/html/'
//     }
//   })
// })

// cp img folder
gulp.task('img', function() {
  return gulp.src([src+'**/images/*.{png,jpg,gif}'])
  // .pipe(npm())
  .pipe(gulp.dest('render'))
})
// cp css folder
gulp.task('cssfold', function() {
  return gulp.src(src+'**/css/*.css')
  // .pipe(npm())
  .pipe(gulp.dest('render'))
})
// sass task
gulp.task('sass', function() {
  return gulp.src(src+'**/scss/*.scss')//<, {base: './css/'}
  .pipe(sass())
  // .pipe(rename("css/styles.css"))
  // .pipe(dest(':scss/:name.css', {scss: 'css'})) // dest>render=root
  // .pipe(gulp.dest('render'))
  // .pipe(gulp.dest(src))
  // .pipe(gulp.dest(dist+'css'))
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
  .pipe(gulp.dest('render'))
  // .pipe(browserSync.reload({
  //   stream: true
  // }));
});
// premailer task
gulp.task('premailer', function () {
  gulp.src('render/**/slim/*.html')
  .pipe(premailer())
  .pipe(gulp.dest('render'));
});

// lancement > fonction watch
gulp.task( 'build',['img','slim','sass','premailer'], function() {
  // gulp.watch( 'browserSync','slim', 'sass', 'imgs' );
  gulp.watch(src+'**/slim/*.slim',['slim','img']);
  gulp.watch(src+'**/scss/*.scss',['sass']);
  // gulp.watch('render/**/slim/*.html',['premailer']);
  // gulp.watch('src/**/images/*.scss',['img']);
});



// gulp.task('watch', ['browserSync', 'slim', 'sass'], function () {
//   gulp.watch('src/scss/*.scss',['sass']);
//   gulp.watch('src/**/*.slim',['slim']);
//   gulp.watch('render/html/index.html',['premailer']);
//   // BV
//   gulp.watch('src/BV/scss/*.scss',['sass2']);
//   gulp.watch('render/html/BV/index.html',['premailerBV']);
// })
