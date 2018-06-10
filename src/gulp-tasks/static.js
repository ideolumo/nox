'use strict';

const gulp           = require('gulp');

module.exports = (context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  gulp.task('static', () => gulp
    .src(['src/static/**/*', 'src/static/**/.*'])
    .pipe(gulp.dest('./build'))
    .pipe(context.browserSync.stream())
  );
};
