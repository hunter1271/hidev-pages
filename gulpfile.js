var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var path = require('path');

var paths = {
    bootstrap_css: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    less: ['assets/less/*.less'],
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('bootstrap_css', function() {
    return gulp.src(paths.bootstrap_css)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(paths.less[0], 'mixins')]
        }))
        .pipe(concat('hd-theme.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch(paths.bootstrap_css, ['bootstrap_css']);
    gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['watch', 'clean', 'bootstrap_css', 'less']);
