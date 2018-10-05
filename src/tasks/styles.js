'use strict'

const path = require('path')
const gulpCleanCss = require('gulp-clean-css')
const gulpSass = require('gulp-sass')

exports.init = (gc, context) => {
  let options = context.options
  let pathSourceOrigin = path.join(options.dirs.source, options.dirs.styles)
  let pathBuildDestination = path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsStyles)

  gc.task('styles', gc.parallel(
    'styles:sass',
  ))

  gc.task('styles:sass', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourceOrigin, '**/*.sass'),
        '!' + path.join(pathBuildDestination, '**/_*.sass')
      ]),
      exports.sassToCSS(gc, context),
      exports.minfiyCSS(gc, context),
      gc.dest(pathBuildDestination),
      context.SyncBrowser()
    ])
  ))
}

exports.sassToCSS = (gc, context) => {
  return gulpSass(context.options.sass).on('error', gulpSass.logError)
}

exports.minfiyCSS = (gc, context) => {
  return gulpCleanCss({})
}
