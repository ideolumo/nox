'use strict';

const configPug    = require('../config/pug');
const gulp         = require('gulp');
const gulpHtmlmin  = require('gulp-htmlmin');
const gulpPug      = require('gulp-pug');
const gulpRename   = require('gulp-rename');
const pump         = require('pump');

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
};
