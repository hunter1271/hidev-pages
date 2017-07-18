'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var sass = require('gulp-sass');
var path = require('path');
var pug = require('gulp-pug');
var webserver = require('gulp-webserver');

var paths = {
    bootstrap_css: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    less: ['assets/less/*.less'],
    views: ['src/*.pug', 'src/_include/*.pug'],
    scss: ['src/assets/*.scss', 'src/assets/hd/*.scss'],
    dist: ['./build']
};

gulp.task('bootstrap_css', function() {
    return gulp.src(paths.bootstrap_css)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${paths.dist}/css`));
});

// gulp.task('less', function () {
//     return gulp.src(paths.less)
//         .pipe(sourcemaps.init())
//         .pipe(less({
//             paths: [path.join(paths.less[0], 'mixins')]
//         }))
//         .pipe(concat('hd-theme.css'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(`${paths.dist}/css`));
// });

gulp.task('watch', function() {
    gulp.watch(paths.bootstrap_css, ['bootstrap_css']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.views, ['views']);
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('views', function () {
    return gulp.src(paths.views)
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest(`${paths.dist}/`))
});

gulp.task('scss', function () {
    gulp.src('./src/assets/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${paths.dist}/css`))
})

gulp.task('webserver', function() {
    gulp.src('./build')
        .pipe(webserver({
            livereload: true,
            open: true,
            path: '/',
            port: 8088,
            fallback: 'index.html'
        }));
});

gulp.task('default', ['watch', 'views', 'bootstrap_css', 'scss', 'webserver']);
