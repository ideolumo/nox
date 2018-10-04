const gulp = require('gulp')
const GulpComposer = require('gulp-composer')

var gc = new GulpComposer(gulp)
const context = require('./build-context')()

require('./tasks/static')(gc, context)
require('./tasks/default')(gc, context)

module.exports = gc
