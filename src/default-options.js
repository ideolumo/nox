'use strict'

const path = require('path')

let options = {}

options.dirs = {
  source: 'source',
  build: 'build',
  static: '_static',
  pages: '_pages',
  themes: '_themes',
  styles: '_styles',
  scripts: '_scripts',
  assets: 'assets',
  assetsThemes: 'themes',
  assetsStyles: 'styles',
  assetsScripts: 'scripts'
}

options.paths = {
  pages: [
    path.join(options.dirs.source, options.dirs.pages),
    path.join(options.dirs.build)
  ],
  static: [
    path.join(options.dirs.source, options.dirs.static),
    path.join(options.dirs.build)
  ],
  scripts: [
    path.join(options.dirs.source, options.dirs.scripts),
    path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsScripts)
  ],
  styles: [
    path.join(options.dirs.source, options.dirs.styles),
    path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsStyles)
  ],
  themes: [
    path.join(options.dirs.source, options.dirs.themes),
    path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsThemes)
  ]
}

options.sass = {
  includePaths: [options.dirs.source],
  outputStyle: 'compressed'
}

options.pug = {
  basedir: options.dirs.source,
  filters: {
    sass: require('./tasks/pages').sassFilterPug(options.sass)
  },
  locals: {
    require: require('./tasks/pages').remappedRootRequire(options.dirs.source)
  },
  extension: '.php'
}

options.minifyHTML = {
  collapseWhitespace: true,
  removeComments: true,
  removeCommentsFromCDATA: true
}

module.exports = options
