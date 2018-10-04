'use strict'

let options = {}

options.dirs = {
  source: 'source',
  build: 'build',
  static: '_static'
}

options.sass = {
  includePaths: [options.sourceFolder],
  outputStyle: 'compressed'
}

options.pug = {
  basedir: options.sourceFolder,
  filters: {
    // sass: gulpComposedPipesPug.sassFilterPug(options.sass)
  },
  locals: {
    // require: gulpComposedPipesPug.remappedRootRequire(options.sourceFolder)
  }
}

module.exports = options
