'use strict'

const pump = require('pump')

exports.gulpPumpTask = (gulp, taskName, ...fns) => {
  gulp.task(taskName, (cb) => {
    return pump(
      ...fns,
      cb
    )
  })
}

exports.gulpWatchTask = (gulp, name, paths, fns) => {
  gulp.task(name, cb => gulp.watch(
      paths,
      gulp.parallel(cb => {console.log('[WATCH]', name, ...fns);cb()}, ...fns))
  )
}
