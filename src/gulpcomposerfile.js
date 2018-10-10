'use strict'

const GulpComposer = require('@ideolumo/gulp-composer')
const path = require('path')


exports.default = context => {
  let gc = new GulpComposer()

  exports.loadTasks(gc, context, [
    'build',
    'clean',
    'default',
    'other-folders',
    'pages',
    'scripts',
    'static',
    'styles',
    'themes',
    'watch'
  ])

  return gc
}

exports.loadTasks = (gc, context, tasks) => {
  for (let task of tasks) {
    require('./' + path.join('tasks', task)).init(gc, context)
  }
}
