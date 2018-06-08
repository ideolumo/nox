'use strict';

const gulp           = require('gulp'),
      del          = require('del');
/**
 * Task: clean
 *
 * Clean build folder
 */
gulp.task('clean', () => del.sync([
    'build/**/*'
  ])
);
