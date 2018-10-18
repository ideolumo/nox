'use strict'

const childProcess = require('child_process')
const gulp = require('gulp')
const path = require('path')

exports.init = (gulp, context) => {
  let pathToDocker = path.resolve(context.initCwd, 'docker/docker-compose.yml')

  console.log('Loading docker-compose from:', pathToDocker)

  /**
   * Task: docker-compose
   *
   * Executes docker-compose with the docker-compose.yml found in the current
   * folder or falling back to the default nox docker-compose.yml file.
   */
  gulp.task('docker', () => {
    console.log(process.cwd(), pathToDocker)
    let docker = childProcess.spawn(
      'docker-compose', ['-f', pathToDocker, 'up'],
      {
        cwd: process.cwd()
      })



    docker.stdout.on('data', (data) => console.log(data.toString()))

    docker.stderr.on('data', (data) => console.error(data.toString()))

    docker.on('close', (code) => {
      console.log(`Docker-compose exited with code ${code}`)
    })

    process.on('exit', () => {
      console.log('Shutting down docker-compose...')

      let dockerShutdown = childProcess
        .spawn('docker-compose', ['-f', pathToDocker, 'down'])

      dockerShutdown.stdout.on('data', (data) => {
        console.log(data.toString())
      })

      dockerShutdown.stderr.on('data', (data) => {
        console.error(data.toString())
      })

      dockerShutdown.on('close', (code) => {
        console.log(
          `Docker-compose successfully shutted down with code ${code}`)
      })
    })
  })
}
