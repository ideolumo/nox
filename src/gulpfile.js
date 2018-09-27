const gulpcomposerfile = require('./gulpcomposerfile')

var gulp = gulpcomposerfile.compose()

console.log(gulp.tree())
