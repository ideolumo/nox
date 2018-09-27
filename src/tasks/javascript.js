'use strict';

const gulp       = require('gulp');
const pump       = require('pump');
const uglifyEs   = require('uglify-es');
const gulpUglify = (require('gulp-uglify/composer'))(uglifyEs, console);

module.exports = (context) => {
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
      context.browserSync.stream()
    ], cb);
  });
};
