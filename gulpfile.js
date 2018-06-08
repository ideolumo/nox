'use strict';

const gulp        = require('gulp'),
      browserSync = require('browser-sync').create();

require('./tasks/pages')(browserSync);
require('./tasks/template')(browserSync);

/**
 * Gulp task sets
 */
gulp.task('build', [
  'clean',
  'template',
  'pages',
  'js',
  'static'
]);

gulp.task('default', [
  'build',
  'watch',
  'http-server'
]);
