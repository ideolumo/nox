'use strict';

const gulp       = require('gulp'),
      pump       = require('pump'),
      uglifyEs   = require('uglify-es'),
      gulpUglify = (require('gulp-uglify/composer'))(uglifyEs, console);
  
module.exports = (browserSync) => {
  /**
   * Task: javascript
   *
   * Minifies js
   */
  gulp.task('javascript', (cb) => {
      pump([
          gulp.src(['src/js/**/*.js']),
          gulpUglify({}),
          gulp.dest('./build/js'),
          browserSync.stream()
      ], cb);
  });
}
