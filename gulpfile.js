// première étape consiste à le requérir (require)
var gulp = require('gulp');
// slim
var slim = require("gulp-slim");
// BS
var browserSync = require('browser-sync');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

// tache browser-sync
gulp.task('browserSync',function () {
  browserSync({
    server: {
      baseDir: 'render'
    }
  })
})

// tache init
//
// tache sass
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('render/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})
// tache slim
gulp.task('slim', function () {
  return gulp.src('src/*.slim')
  .pipe(slim({pretty: true}))
  .pipe(gulp.dest('render'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// lancement
//
// sans BS
// gulp.task('watch', function(){
//   gulp.watch('src/scss/**/*.scss', ['sass']);
// })
//
// avec
gulp.task('watch', ['browserSync', 'sass', 'slim'],function () {
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/*.slim',['slim']);
})
