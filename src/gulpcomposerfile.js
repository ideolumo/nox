const gulp = require('gulp')
const gulpComposer = require('gulp-composer')

var gc = new gulpComposer(gulp)
var context = {}

require('./tasks/static')(gc, context)


module.exports = gc.compose()
