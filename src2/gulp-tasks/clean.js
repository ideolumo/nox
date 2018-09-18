'use strict';

const del  = require('del');
const gulp = require('gulp');

/**
 * Task: clean
 *
 * Clean build folder
 */
module.exports = (context) => {
  gulp.task('clean', () => del.sync([context.options.buildFolder + '/**/*']));
}

