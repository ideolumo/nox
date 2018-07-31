const sass = require('node-sass')
let result;
try {
  result = sass.renderSync({
    data: '.s{ background-color: $test}'
  })
} catch(err) {
  console.log(err)
}

console.log(result)


