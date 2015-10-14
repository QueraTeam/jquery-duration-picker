var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mincss = require('gulp-minify-css');
//var concat = require('gulp-concat');
//var imagemin = require('gulp-imagemin');
//var sourcemaps = require('gulp-sourcemaps');
//var del = require('del');


gulp.task('build', function () {
    gulp.src('src/jquery-duration-picker.js').pipe(uglify())
        .pipe(rename('jquery-duration-picker.min.js'))
        .pipe(gulp.dest('dist'));
    gulp.src('src/jquery-duration-picker.css').pipe(mincss({compatibility: 'ie8'}))
        .pipe(rename('jquery-duration-picker.min.css'))
        .pipe(gulp.dest('dist'));
    gulp.src('src/jquery-duration-picker.rtl.css').pipe(mincss({compatibility: 'ie8'}))
        .pipe(rename('jquery-duration-picker.rtl.min.css'))
        .pipe(gulp.dest('dist'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);
