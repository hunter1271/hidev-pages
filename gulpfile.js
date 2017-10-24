'use strict'

var gulp       = require('gulp'),
    scss       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver  = require('gulp-webserver'),
    pug        = require('gulp-pug'),
    cleanCSS = require('gulp-clean-css');

var sources = {
    vendor_css: [
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/geocomplete/jquery.geocomplete.js',
        'node_modules/select2/dist/js/select2.full.js',
        'node_modules/quill/dist/quill.min.js',
        'src/script/script.js',
    ],
    views: ['src/*.pug', 'src/*/*.pug'],
    scss: 'src/scss/styles.scss',
};

var dest = {
    css: './build/css',
    js: './build/js',
    html: './build'
};

gulp.task('scripts', function () {
    return gulp.src(sources.scripts)
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

gulp.task('scripts:watch', function () {
    gulp.watch(sources.scripts, ['scripts']);
});

gulp.task('scss', function (){
    return gulp.src(sources.scss)
        //.pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write())
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

gulp.task('build', ['views', 'scss', 'scripts', 'server', 'scss:watch', 'views:watch', 'scripts:watch']);
gulp.task('default', ['build']);