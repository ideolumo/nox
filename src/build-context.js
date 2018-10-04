const defaultOptions = require('./default-options')
const browserSync = require('browser-sync').create()

module.exports = () => {
  const context = {
    initCwd: process.env.INIT_CWD || process.cwd(),
    options: defaultOptions,
    browserSync,
    SyncBrowser: browserSync.stream
  }
  return context
}
