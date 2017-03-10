'use strict';

var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    jshint = require('jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    cache = require('gulp-cache'),
    del = require('del'),
    browserSync = require('browser-sync').create()

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('styles', function() {
  return gulp.src(['src/css/*.scss'])
    .pipe(sass({outputStyle: 'full'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('vendor', function() {
  return gulp.src(['src/vendor/*.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('images', function() {
  return gulp.src(['src/img/*'])
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('video', function() {
  return gulp.src(['src/video/*'])
    .pipe(gulp.dest('dist/video/'))
});


gulp.task('serve', function() {

    browserSync.init({
        proxy: {
            target: "http://localhost/~jacksp36/jumprightin/dist/"
        }
    });

// Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .html files
    gulp.watch('src/**/*.html', ['html']);
    // Watch libs files
    gulp.watch('src/vendor/**/*.js', ['vendor']);
    // Watch image files
    gulp.watch('src/img/*', ['images']);    
    // Watch video files
    gulp.watch('src/video/*', ['video']);
    // Browser sync reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return del(['dist'])
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'vendor', 'html', 'images', 'video')
});