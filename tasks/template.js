'use strict';

const gulp           = require('gulp'),
      gulpCleanCss   = require('gulp-clean-css'),
      gulpSass       = require('gulp-sass'),
      gulpIf         = require('gulp-if'),
      gulpData       = require('gulp-data'),
      configSass     = require('../config/sass');

module.exports = (browserSync) => {
  /**
   * Task: template-sass
   *
   * Compiles all .sass files in src/template and copies them to
   * build/assets/template/css. Minifies css.
   * Ignores files starting with _.
   */
  gulp.task('template-sass', () => gulp
    .src([
      'src/template/**/*.sass',
      '!src/template/**/_*.sass',
      '!src/template/regions/**/*'])
    .pipe(gulpSass(configSass).on('error', gulpSass.logError))
    .pipe(gulpCleanCss({}))
    .pipe(gulp.dest('./build/assets/template/css'))
    .pipe(browserSync.stream())
  );

  /**
   * Task: template-assets
   *
   * Copies asset files from src/template to build/assets/template.
   * Ignores files starting with _ and sass/pug files
   */
  gulp.task('template-assets', () => gulp
      .src([
          'src/template/**/*.*',
          '!src/template/**/_*',
          '!src/template/**/*.pug',
          '!src/template/**/*.sass'])
      .pipe(gulp.dest('./build/assets/template'))
      .pipe(browserSync.stream())
  );

  gulp.task('template', ['template-sass', 'template-assets']);
}
