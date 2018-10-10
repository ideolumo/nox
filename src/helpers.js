'use strict'

exports.gcWatchTask = (gc, name, paths, fns) => {
  gc.task(name, cb => gc.gulp.watch(
      paths,
      gc.gulp.parallel(cb => {console.log('[WATCH]', name, ...fns);cb()}, ...fns))
  )
}
