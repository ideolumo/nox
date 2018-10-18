'use strict'

const gulp = require('gulp')
const path = require('path')
const undertakerForwardReference = require('undertaker-forward-reference')

exports.gulp = gulp

exports.gulp.registry(undertakerForwardReference())

exports.loadTasks = (gulp, context, tasks) => {
  for (let task of tasks) {
    require('./' + path.join('tasks', task)).init(gulp, context)
  }
}

exports.context = require('./build-context')()

exports.loadTasks(exports.gulp, exports.context, [
  'build',
  'clean',
  'default',
  'other-folders',
  'pages',
  'scripts',
  'static',
  'styles',
  'themes',
  'watch',
  'browsersync',
  'docker',
  'http-server'
])
