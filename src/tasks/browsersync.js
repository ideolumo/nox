'use strict'

exports.init = (gulp, context) => {
  gulp.task('browsersync', () => {
    context.browserSync.init({
      proxy: 'localhost:8081',
      port: 8080,
      ui: {
        port: 8082
      }
    })
  })
}
