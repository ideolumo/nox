'use strict';

const gulpComposedPipesPug = require('../gulp-composed-pipes/pug');
const gulp                 = require('gulp');
const pump                 = require('pump');

module.exports = (context) => {
  gulp.task('pages-pug', (cb) => {
    pump([
      gulp.src(['src/pages/**/*.pug', '!src/pages/**/_*.pug']),
      ...gulpComposedPipesPug(context),
      gulp.dest('./build'),
      context.browserSync.stream()
    ], cb);
  });

  /**
   * Task: pages-assets
   *
   * Copies everything from src/pages/<pagename>/assets to
   * build/assets/pages/<pagename>.
   * Ignores files starting with _.
   */
  gulp.task('pages-assets', () => gulp
    .src([
      'src/pages/**/*.*',
      '!src/pages/**/_*',
      '!src/pages/**/*.pug',
      '!src/pages/**/*.sass'])
    .pipe(gulp.dest('./build'))
    .pipe(context.browserSync.stream())
  );

  gulp.task('pages', ['pages-pug', 'pages-assets']);
};
