'use strict'

const GulpComposer = require('gulp-composer')
const path = require('path')

var gc = new GulpComposer()
const context = require('./build-context')()

function loadTask (task) {
  require('./' + path.join('tasks', task)).init(gc, context)
}

loadTask('static')
loadTask('pages')
loadTask('default')

module.exports = gc
