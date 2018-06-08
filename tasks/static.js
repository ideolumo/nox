'use strict';

const gulp           = require('gulp');

module.exports = (browserSync) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  gulp.task('static', () => gulp
    .src(['src/static/**/*', 'src/static/**/.*'])
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
  );
};
