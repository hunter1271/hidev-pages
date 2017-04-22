var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    bootstrap_css: ['node_modules/bootstrap/dist/css/*.css'],
    css: ['assets/css/*.css']
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

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch(paths.bootstrap_css, ['bootstrap_css']);
    gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['watch', 'clean', 'bootstrap_css', 'css']);
