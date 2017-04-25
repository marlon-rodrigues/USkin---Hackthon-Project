var gulp  = require('gulp');
var sass  = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

gulp.task('sass', function () {
  gulp.src('./views/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('default', ['sass'], function () {
  gulp.watch('./views/sass/**/*.scss', ['sass']);
});


