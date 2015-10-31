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

// sass task
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('render/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
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
  .pipe(gulp.dest('render/'));
});

// BV
// premailerBV task
gulp.task('premailerBV', function () {
  gulp.src('render/html/BV/index.html')
  .pipe(premailer())
  .pipe(gulp.dest('render/html/BV/html/'))
});
// sass2 task
gulp.task('sass2', function() {
  return gulp.src('src/BV/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('render/html/BV/css'))
})

// lancement > fonction watch
gulp.task(
  'watch',
  ['browserSync', 'slim', 'sass', 'sass2', 'premailerBV', 'premailer'],
  function () {
  gulp.watch('src/scss/*.scss',['sass']);
  gulp.watch('src/**/*.slim',['slim']);
  gulp.watch('render/html/index.html',['premailer']);
  // BV
  gulp.watch('src/BV/scss/*.scss',['sass2']);
  gulp.watch('render/html/BV/index.html',['premailerBV']);
})
