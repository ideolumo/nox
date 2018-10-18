'use strict'

const {join} = require('path')
const {gulpWatchTask} = require('../helpers')

exports.init = (gulp, context) => {
  let options = context.options

  let otherFolders = [
    options.dirs.pages,
    options.dirs.static,
    options.dirs.styles,
    options.dirs.themes,
    options.dirs.scripts
  ]

  let globs = [
    join(options.dirs.source, '**/*'),
    '!' + join(options.dirs.source, `(${otherFolders.join('|')})`)
  ]

  gulpWatchTask(gulp, 'watch:other-folders', globs, ['pages:pug', 'themes:sass'])

}
