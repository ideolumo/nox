'use strict'

exports.context = require('./build-context')()
exports.gulpComposer = require('./gulpcomposerfile').default(exports.context)
exports.gulp = exports.gulpComposer.compose()
