'use strict'

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug');

var sources = {
    bootstrap: ['node_modules/bootstrap/dist/css/bootstrap.min.css']
};

var dest = {
    css: './build/css'
};

gulp.task('bootstrap_css', function() {
    return gulp.src(sources.bootstrap)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.css));
});

gulp.task('build', ['bootstrap_css']);