/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/

/*----------  dependance  > package.json > node_modules  ----------*/
var gulp    = require('gulp'),
browserSync = require('browser-sync'),
slim        = require("gulp-slim"),
sass        = require('gulp-sass'),
premailer   = require('gulp-premailer');


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

// sass1 task
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('render/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})
// sass2 task
gulp.task('sass2', function() {
  return gulp.src('src/BV/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('render/html/BV/css'))
})

// slim task
gulp.task('slim', function () {
  return gulp.src('src/**/*.slim')
  .pipe(slim({
    pretty: true // ,require: 'slim/include'
  }))
  .pipe(gulp.dest('render/html'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// premailer task
gulp.task('premailer', function () {
  gulp.src('render/html/index.html')
  .pipe(premailer())
  .pipe(gulp.dest('render/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// lancement > fonction watch
gulp.task(
  'watch',
  ['slim', 'browserSync', 'premailer', 'sass','sass2'],
  function () {
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/**/*.slim',['slim'],['premailer']);
  gulp.watch('render/html/index.html',['premailer']);
  // gulp.watch('src/BV/scss/*.scss',['sass2']);
})
