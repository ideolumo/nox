module.exports = () => {
  exports.foo()
}

exports.foo = () => {
  console.log('foo')
}
