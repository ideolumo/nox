'use strict'

const path = require('path')
const {gcWatchTask} = require('../helpers')

exports.init = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options
  console.log(options.paths.themes[0], '->', options.paths.themes[1])

  gc.task('themes', gc.parallel('themes:assets'))
  gc.task('watch:themes', gc.parallel('watch:themes:assets'))

  let globsAssets = [
    path.join(options.paths.themes[0], '**/*'),
    path.join(options.paths.themes[0], '**/.*'),
    '!' + path.join(options.paths.themes[0], '**/_*'),
    '!' + path.join(options.paths.themes[0], '**/*.sass'),
    '!' + path.join(options.paths.themes[0], '**/*.pug'),
  ]

  gc.task('themes:assets', gc.fn(gc.pump([
    gc.src(globsAssets),
    gc.dest(options.paths.themes[1]),
    context.SyncBrowser()
  ])))

  gcWatchTask(gc, 'watch:themes:assets', globsAssets, ['themes:assets'])

}
