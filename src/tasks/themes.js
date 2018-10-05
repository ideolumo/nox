'use strict'

const path = require('path')

exports.init = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options
  let pathSourceThemes = path.join(options.dirs.source, options.dirs.themes)
  gc.task('themes-assets', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourceStatic, '**/*'), path.join(pathSourceStatic, '**/.*')
      ]),
      gc.dest(path.join(options.dirs.build)),
      context.SyncBrowser()
    ])
  ))
}
