'use strict';

const gulp           = require('gulp'),
      pump           = require('pump'),
      gulpPug        = require('gulp-pug'),
      gulpIf         = require('gulp-if'),
      gulpHtmlmin    = require('gulp-htmlmin'),
      gulpCleanCss   = require('gulp-clean-css'),
      gulpRename     = require('gulp-rename'),
      gulpData       = require('gulp-data'),
      gulpRun        = require('gulp-run');

const configPug      = require('../config/pug');

module.exports = (browserSync) => {
  gulp.task('pages-pug', (cb) => {
    pump([
      gulp.src(['src/pages/**/*.pug', '!src/pages/**/_*.pug']),
      gulpPug(configPug),
      gulpHtmlmin({
        collapseWhitespace: true,
        removeComments: true, 
        removeCommentsFromCDATA: true}),
      gulpRename((path) => {path.extname = '.php';}),
      gulp.dest('./build'),
      browserSync.stream()
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
      .pipe(browserSync.stream())
  );

  gulp.task('pages', ['pages-pug', 'pages-assets']);
}
