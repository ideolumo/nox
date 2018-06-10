'use strict';

const del  = require('del');
const gulp = require('gulp');

/**
 * Task: clean
 *
 * Clean build folder
 */
gulp.task('clean', () => del.sync(['build/**/*']));
