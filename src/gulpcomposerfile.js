'use strict'

const GulpComposer = require('@ideolumo/gulp-composer')
const path = require('path')

var gc = new GulpComposer()
const context = require('./build-context')()

function loadTask (task) {
  require('./' + path.join('tasks', task)).init(gc, context)
}

loadTask('build')
loadTask('clean')
loadTask('default')
loadTask('scripts')
loadTask('static')
loadTask('styles')
loadTask('pages')
loadTask('themes')

module.exports = gc
