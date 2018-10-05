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
  let pathBuildAssetsThemes = path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsThemes)
  console.log(pathSourceThemes, '->', pathBuildAssetsThemes)

  gc.task('themes', gc.parallel('themes:assets'))

  gc.task('themes:assets', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourceThemes, '**/*'),
        path.join(pathSourceThemes, '**/.*'),
        '!' + path.join(pathSourceThemes, '**/_*'),
        '!' + path.join(pathSourceThemes, '**/*.sass'),
        '!' + path.join(pathSourceThemes, '**/*.pug'),
      ]),
      gc.dest(pathBuildAssetsThemes),
      context.SyncBrowser()
    ])
  ))
}
