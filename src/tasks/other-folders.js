'use strict'

const {join} = require('path')
const {gcWatchTask} = require('../helpers')

exports.init = (gc, context) => {
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

  gcWatchTask(gc, 'watch:other-folders', globs, ['pages:pug', 'themes:sass'])

}
