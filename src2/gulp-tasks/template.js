'use strict';

const gulp                  = require('gulp');
const gulpComposedPipesSass = require('../gulp-composed-pipes/sass');
const pump                  = require('pump');

module.exports = (context) => {
  /**
   * Task: template-sass
   *
   * Compiles all .sass files in src/template and copies them to
   * build/assets/template/css. Minifies css.
   * Ignores files starting with _.
   */
  gulp.task('template-sass', (cb) => { 
    pump([
      gulp.src([
        'src/template/**/*.sass',
        '!src/template/**/_*.sass',
        '!src/template/regions/**/*'
      ]),
      ...gulpComposedPipesSass(context),
      gulp.dest('./build/assets/template/css'),
      context.browserSync.stream()
    ], cb);
  });

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
    .pipe(context.browserSync.stream())
  );

  gulp.task('template', ['template-sass', 'template-assets']);
};
