
/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/

/*----------  dependance  > package.json > node_modules  ----------*/
var gulp    = require('gulp'), 
browserSync = require('browser-sync'),
slim        = require("gulp-slim"),
sass        = require('gulp-sass');

/*=================================
=            variables            =
=================================*/
var d = new Date();
gulp.task('date_time', function() {
    console.log(d);
});

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
  return gulp.src('src/*.slim')
  .pipe(slim({
    pretty: true // ,require: 'slim/include'
  }))
  .pipe(gulp.dest('render'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// lancement > fonction watch
gulp.task(
  'watch',
  ['browserSync', 'sass', 'slim'], function () {
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/*.slim',['slim']);
})

/*============================
=            test            =
============================*/


/*=====  End of test  ======*/
