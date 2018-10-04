'use strict'

module.exports = (gc, context) => {
  gc.task('default', gc.series('static'))
}
