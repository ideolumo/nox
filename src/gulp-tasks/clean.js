'use strict';

const del  = require('del');
const gulp = require('gulp');

/**
 * Task: clean
 *
 * Clean build folder
 */
module.exports = (context) => {
  gulp.task('clean', (cb) => {
    del.sync([context.options.buildFolder + '/**/*'])
    cb();
  });
}

