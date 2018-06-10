'use strict';

const gulpCleanCss = require('gulp-clean-css');
const gulpSass     = require('gulp-sass');

let gulpComposedPipesSass = (context) => {
  return [
    gulpSass(context.options.sass).on('error', gulpSass.logError),
    gulpCleanCss({})
  ];
}

module.exports = gulpComposedPipesSass;
