var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');

// gulp.task('compileJS', function(cb){
// 	// var config = webpackConfig(global.isWatching);
// 	// webpack(config, function(err, stats) {
// 	//     if (err) { $.util.PluginError('webpack', err); }

// 	//     $.util.log('[webpack]', stats.toString(config.stats));
// 	//     cb(err);
// 	//     // Do not invoke this agian, will throw "task completion callback called too many times" otherwise.
// 	//     cb = function() {};
//  //  	});

// });
gulp.task("compileJS", function(callback) {
    // run webpack
    var config = webpackConfig(global.isWatching);
    webpack(config, function(err, stats) {
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('compileCSS', function() {
  var destDir = './build/css';
  gulp.src('./app/css/base.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(destDir));
});

gulp.task('watchCSS', function () {
  gulp.watch('./app/css/*.scss', ['compileCSS']);
});

gulp.task('cleanWatch', function(cb) {
  del(['watch'], cb);
});


gulp.task('setWatch', function() {
  global.isWatching = true;
});


gulp.task('watch', ['cleanWatch', 'setWatch'], function() {
  gulp.start(['compileCSS', 'compileJS', 'watchCSS'])
});


gulp.task('default', ['watch']);