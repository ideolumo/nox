#!/bin/sh

function test1 {
  echo "hallo"
  ./node_modules/.bin/gulp -f ./src/gulpfile.js --cwd ./test/projects/test_project_1
}

test1
