"use strict";


var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var bundler = browserify('src/bus.js');

gulp.task('test', function () {
	return gulp.src('./specs/**/*.js')
		.pipe(jasmine());
});

gulp.task('watch', ['build'], function () {
	gulp.watch('src/**/*.js', ['build']);
	return;
});

gulp.task('build', ['test'], function () {
	return bundler.bundle()
		.on('error', showError)
		.pipe(source('bus.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('bundle/'));
});

gulp.task('default', ['test', 'build', 'watch']);

function showError (err) {
	gutil.log(gutil.colors.red(err.message));
	this.emit('end');
}
