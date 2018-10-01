const gulp           = require('gulp')
const gulpComposer   = require('gulp-composer')
const process        = require('process')



var gc = new gulpComposer(gulp)
const context = require('./build-context')()

require('./tasks/static')(gc, context)


module.exports = gc.compose()
