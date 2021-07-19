const gulp = require('gulp');
const browserSync    = require('browser-sync').create();

function parseOptions(args) {
  let context = {
    initCwd: process.env.INIT_CWD || process.cwd(),
    options: require('./src/default-options'),
    browserSync
  }

  for(let i=0;i<args.length;i++) {
    let arg = args[i]
    if(arg == '--cwd') {
      
    }
  
    console.log(arg)
  }

  return context
}

let context = parseOptions([])
require('./src/register-gulp-tasks')(context)

gulp.series('default')
