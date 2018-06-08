'use strict';

const gulp           = require('gulp');

const gulpPug        = require('gulp-pug'),
      gulpIf         = require('gulp-if'),
      gulpHtmlmin    = require('gulp-htmlmin'),
      gulpCleanCss   = require('gulp-clean-css'),
      gulpRename     = require('gulp-rename'),
      gulpData       = require('gulp-data'),
      gulpRun        = require('gulp-run');

const configPug      = require('../config/pug');

/**
 * Task: pages-pug
 *
 * Compiles pug templates in src/pages/<pagename>/xx/<templatename>.pug and
 * copies the compiled template to build/<templatename>.php.
 * Ignores files starting with _.
 */

module.exports = (browserSync) => {
  gulp.task('pages-pug', () => gulp
    .src([
      'src/pages/**/*.pug',
      '!src/pages/**/_*.pug'])
    .pipe(gulpPug(configPug))
    .pipe(gulpHtmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeCommentsFromCDATA: true}))
    .pipe(gulpRename((path) => {
      path.extname = '.php';
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
  );

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
      .pipe(browserSync.stream())
  );

  gulp.task('pages', ['pages-pug', 'pages-assets']);
}
