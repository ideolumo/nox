'use strict'

const path = require('path')
const {gulpWatchTask} = require('../helpers')
const pump = require('pump')

exports.init = (gulp, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options
  console.log(options.paths.themes[0], '->', options.paths.themes[1])

  gulp.task('themes', gulp.parallel('themes:assets'))
  gulp.task('watch:themes', gulp.parallel('watch:themes:assets'))

  let globsAssets = [
    path.join(options.paths.themes[0], '**/*'),
    path.join(options.paths.themes[0], '**/.*'),
    '!' + path.join(options.paths.themes[0], '**/_*'),
    '!' + path.join(options.paths.themes[0], '**/*.sass'),
    '!' + path.join(options.paths.themes[0], '**/*.pug'),
  ]

  gulp.task('themes:assets', (cb) => {
    return pump(
      gulp.src(globsAssets),
      gulp.dest(options.paths.themes[1]),
      context.SyncBrowser(),
      cb
    )
  })

  gulpWatchTask(gulp, 'watch:themes:assets', globsAssets, ['themes:assets'])

}
