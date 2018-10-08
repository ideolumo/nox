'use strict'

const path = require('path')
const gulpCleanCss = require('gulp-clean-css')
const gulpSass = require('gulp-sass')

exports.init = (gc, context) => {
  let options = context.options

  gc.task('styles', gc.parallel(
    'styles:sass',
  ))

  gc.task('styles:sass', gc.fn(gc.pump([
    gc.src([
      path.join(options.paths.styles[0], '**/*.sass'),
      '!' + path.join(options.paths.styles[0], '**/_*.sass')
    ]),
    exports.sassToCSS(gc, context),
    exports.minfiyCSS(gc, context),
    gc.dest(options.paths.styles[1]),
    context.SyncBrowser()
  ])))
}

exports.sassToCSS = (gc, context) => {
  return gulpSass(context.options.sass).on('error', gulpSass.logError)
}

exports.minfiyCSS = (gc, context) => {
  return gulpCleanCss({})
}
