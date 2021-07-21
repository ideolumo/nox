'use strict';

const gulp = require('gulp')
const gulpCleanCss = require('gulp-clean-css');
const gulpSass     = require('gulp-sass');

let gulpComposedPipesSass = (context) => {
  return gulp.series(
    gulpSass(context.options.sass).on('error', gulpSass.logError),
    gulpCleanCss({})
  );
}

gulp.task('sass', gulpComposedPipesSass)

module.exports = gulpComposedPipesSass;
