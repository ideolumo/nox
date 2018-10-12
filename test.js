'use strict';

const _exec = require('child_process').exec

var exec = (cmd, options) => {
  let resolve, reject
  let promise = new Promise((res, rej) => {[resolve, reject] = [res, rej]})

  if(!resolve || !reject) throw new Error(`Couldn't get resolve/reject from Promise`)

  promise.child_process = _exec(cmd, options, (err, stdout, stderr) => {
    if(err) return reject(err, stdout, stderr)
    resolve(stdout, stderr)
  })

  return promise
}

async function main() {
  let a = exec('gulp -f ./src/gulpfile.js watch')
  console.log(a)
  a.child_process.kill()
}

main()
