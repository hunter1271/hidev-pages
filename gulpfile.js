'use strict'

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    pug = require('gulp-pug');

var sources = {
    bootstrap: ['node_modules/bootstrap/dist/css/*.css'],
    views: ['src/*.pug'],
    scss: ['src/scss/*.scss', 'src/scss/block/*.scss'],
};

var dest = {
    css: './build/css',
    html: './build'
};

gulp.task('bootstrap_css', function() {
    return gulp.src(sources.bootstrap)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.css));
});

gulp.task('views', function () {
    return gulp.src(sources.views)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(dest.html))
});

gulp.task('views:watch', function () {
    gulp.watch(sources.views, ['views']);
});

gulp.task('scss', function (){
    return gulp.src(sources.scss)
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.css));
});

gulp.task('scss:watch', function () {
    gulp.watch(sources.scss, ['scss']);
});

gulp.task('server', function() {
    gulp.src('./build')
        .pipe(webserver({
            livereload: true,
            path: '/',
            port: 8080,
            fallback: 'layout.html'
        }));
});

gulp.task('build', ['bootstrap_css', 'views', 'scss', 'server', 'scss:watch', 'views:watch']);
gulp.task('default', ['build']);