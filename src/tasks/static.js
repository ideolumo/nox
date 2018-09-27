'use strict';


var taskSeries = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  gc.task('default', gc.fn(
    gc.src('/tmp/static/**')
      .pipe(gc.dest('/tmp/build/'))
  ))
}

module.exports = taskSeries
