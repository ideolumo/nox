'use strict'

const path = require('path')
const gulpCleanCss = require('gulp-clean-css')
const gulpSass = require('gulp-sass')
const {gulpWatchTask} = require('../helpers')
const pump = require('pump')

exports.init = (gulp, context) => {
  let options = context.options

  gulp.task('styles', gulp.parallel('styles:sass'))
  gulp.task('watch:styles', gulp.parallel('watch:styles:sass'))

  let globsSass = [
    path.join(options.paths.styles[0], '**/*.sass'),
    '!' + path.join(options.paths.styles[0], '**/_*.sass')
  ]

  gulp.task('styles:sass', (cb) => {
    return pump(
      gulp.src(globsSass),
      exports.sassToCSS(gulp, context),
      exports.minfiyCSS(gulp, context),
      gulp.dest(options.paths.styles[1]),
      context.SyncBrowser(),
      cb
    )
  })

  gulpWatchTask(gulp, 'watch:styles:sass', globsSass, ['styles:sass'])
}

exports.sassToCSS = (gulp, context) => {
  return gulpSass(context.options.sass).on('error', gulpSass.logError)
}

exports.minfiyCSS = (gulp, context) => {
  return gulpCleanCss({})
}
