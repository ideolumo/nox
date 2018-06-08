'use strict';

const gulp           = require('gulp');

/**
 * Task: clean
 *
 * Clean build folder
 */
gulp.task('clean', () => del.sync([
    'build/**/*'
  ])
);
