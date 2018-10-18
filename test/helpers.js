'use strict'

const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const tempy = require('tempy')
const globby = require('globby')
const util = require('util')
const _exec = require('child_process').exec
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const EventEmitter = require('events')

class GulpEmitter extends EventEmitter {
  constructor() {
    super()
  }

  emit( ) {
    super.emit('all', ...arguments)
    super.emit(...arguments)
  }
}

exports.tempyNox = async patterns => {
  let temp = tempy.directory()
  let pathTestProject = './test/test-project'

  await fse.mkdir(path.join(temp, 'source'))
  await fse.mkdir(path.join(temp, 'build'))

  let paths = await globby(patterns, {
    cwd: pathTestProject,
    dot: true
  })

  for(let p of paths) {
    await fse.copy(path.join(pathTestProject, p), path.join(temp, p))
  }
  console.log(`temporary nox directory: ${temp}`)
  return temp
}

exports.exec = (cmd, options) => {
  let resolve, reject
  let promise = new Promise((res, rej) => {[resolve, reject] = [res, rej]})

  if(!resolve || !reject) throw new Error(`Couldn't get resolve/reject from Promise`)

  promise.child_process = _exec(cmd, options, (err, stdout, stderr) => {
    if(err) return reject(err, stdout, stderr)
    resolve(stdout, stderr)
  })

  return promise
}

exports.REGEX_MATCH_GULP_START_FINISH = /(?:\[(\d\d:\d\d:\d\d)\] )?((?:Finished)|(?:Starting)) (?:'(.+?)')(?:\.\.\.)?(?: after (\d\d) ms)?/gm
exports.runGulp = (cwd, gulpfile, tasks) => {
  if(!gulpfile) gulpfile = './src/gulpfile.js'
  if(!tasks) tasks = ['build']
  if(typeof tasks === 'string') tasks = [tasks]
  let cmd = `./node_modules/.bin/gulp -f ${gulpfile} --cwd ${cwd} ${tasks.join(' ')}`

  let promise = exports.exec(cmd)
  promise.kill = async () => {
    let status = promise.child_process.kill()
    try { await promise } catch {}
    return status
  }

  promise.events = new GulpEmitter()

  promise.child_process.stdout.on('data', data => {
    let lines = data.split('\n')
    for(let line of lines) {
      promise.events.emit('stdout', data)
      let regex = exports.REGEX_MATCH_GULP_START_FINISH.exec(data)
      if(regex) {
        let [full, time, type, task, delay] = regex
        type = type.toLowerCase()
        promise.events.emit(type, task, time, delay, full)
        promise.events.emit(`${type}-${task}`, time, delay, full)
      }

    }
  })

  return promise
}

exports._joinPathIfArray = p => Array.isArray(p) ? path.join(...p) : p

exports.testFileExists = async (t, p, msg) => {
  p = exports._joinPathIfArray(p)
  //t.comment(`testFileExists() Checking if ${p} exists`)
  t.ok(await fse.pathExists(p), msg)
}

exports.testFileNotExists = async (t, p, msg) => {
  p = exports._joinPathIfArray(p)
  //t.comment(`testFileExists() Checking if ${p} exists`)
  t.ok(await fse.pathExists(p) === false, msg)
}

exports.testFileContentEquals = async(t, p, content, msg) => {
  p = exports._joinPathIfArray(p)
  let data = await readFile(p, 'utf8')
  t.equal(data, content, msg)
}

exports.replaceFileContent = async(path, content, options) => {
  return await writeFile(path, content, options)
}

exports.sleep = util.promisify(setTimeout)

exports.waitForEvent = (eventEmitter, event) => {
  return new Promise(resolve => {
    eventEmitter.once(event, (...args) => resolve(...args))
  })
}
