'use strict';

const childProcess = require('child_process');
const gulp         = require('gulp');
const path         = require('path');

module.exports = (context) => {
  let pathToDocker = path.resolve(context.initCwd, 'docker/docker-compose.yml')

  console.log('Loading docker-compose from:', pathToDocker)

  /**
   * Task: docker-compose
   *
   * Run docker-compose.yml from ./docker.
   */
  gulp.task('docker-compose', () => {
    let docker = childProcess
      .spawn('docker-compose', ['-f', pathToDocker, 'up']);

    docker.stdout.on('data', (data) => console.log(data.toString()));

    docker.stderr.on('data', (data) => console.error(data.toString()));

    docker.on('close', (code) => {
      console.log(`Docker-compose exited with code ${code}`);
    });

    process.on('exit', () => {
      console.log('Shutting down docker-compose...');

      let dockerShutdown = childProcess
        .spawn('docker-compose', ['-f', pathToDocker, 'down']);

      dockerShutdown.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      dockerShutdown.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      dockerShutdown.on('close', (code) => {
        console.log(
          `Docker-compose successfully shutted down with code ${code}`);
      });
    });
  });

  /**
   * Task: browser-sync
   *
   * Start browser-sync http server which auto reloads whenever we detect
   * a change. Proxies requests to http server running on localhost:8081.
   */
  gulp.task('browser-sync', () => {
    context.browserSync.init({
      proxy: 'localhost:8081',
      port: 8080,
      ui: {
        port: 8082
      }
    });
  });

  /**
   * Task: http-server
   *
   * Starts all http server related tasks.
   */
  gulp.task('http-server', ['docker-compose', 'browser-sync']);
};

