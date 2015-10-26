// première étape consiste à le requérir (require)
var gulp = require('gulp');
// fileinclude
var fileinclude = require('gulp-file-include');
// slim
var slim = require("gulp-slim");
// var slimr = require ("slim/include");
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
// import partial
gulp.task('fileinclude', function() {
  gulp.src('index.slim')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'src'
    }))
    .pipe(gulp.dest('render'))
    .pipe(browserSync.reload({
    stream: true
  }))
});
// tache slim
gulp.task('slim', function () {
  return gulp.src('./src/*.slim')
  .pipe(slim({
    pretty: true,
    require: 'slim/include'
  }))
  .pipe(gulp.dest('render'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// lancement
//
gulp.task('watch', ['browserSync', 'fileinclude', 'sass', 'slim'],function () {
  gulp.watch('src/index.slim',['fileinclude']);
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/*.slim',['slim']);
})
