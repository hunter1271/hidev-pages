'use strict'

var gulp       = require('gulp'),
    scss       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver  = require('gulp-webserver'),
    pug        = require('gulp-pug');

var sources = {
    bootstrap: ['node_modules/bootstrap/dist/css/*.css'],
    vendor_js: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    views: ['src/*.pug', 'src/*/*.pug'],
    scss: ['src/scss/*.scss', 'src/scss/block/*.scss']
};

var dest = {
    css: './build/css',
    js: './build/js',
    html: './build'
};

gulp.task('bootstrap_css', function() {
    return gulp.src(sources.bootstrap)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.css));
});

gulp.task('scripts', function () {
    return gulp.src(sources.vendor_js)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.js));
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
            port: 8099,
            fallback: 'index.html'
        }));
});

gulp.task('build', ['bootstrap_css', 'views', 'scss', 'scripts', 'server', 'scss:watch', 'views:watch']);
gulp.task('default', ['build']);