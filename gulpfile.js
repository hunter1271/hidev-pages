'use strict'

var gulp       = require('gulp'),
    scss       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver  = require('gulp-webserver'),
    pug        = require('gulp-pug');

var sources = {
    vendor_css: [
        'node_modules/bootstrap/dist/css/*.css',
        'node_modules/select2/dist/css/select2.min.css',
        'node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css'
    ],
    vendor_js: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/geocomplete/jquery.geocomplete.js',
        'node_modules/select2/dist/js/select2.full.js',
        'src/script/script.js',
    ],
    views: ['src/*.pug', 'src/*/*.pug'],
    scss: ['src/scss/*.scss', 'src/scss/block/*.scss']
};

var dest = {
    css: './build/css',
    js: './build/js',
    html: './build'
};

gulp.task('vendor_css', function() {
    return gulp.src(sources.vendor_css)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
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

gulp.task('build', ['vendor_css', 'views', 'scss', 'scripts', 'server', 'scss:watch', 'views:watch']);
gulp.task('default', ['build']);