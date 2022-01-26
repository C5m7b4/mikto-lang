function red(output) {
  console.log('\x1b[31m', output, '\x1b[0m');
}

function green(output) {
  console.log('\x1b[32m', output, '\x1b[0m');
}

function blue(output) {
  console.log('\x1b[34m', output, '\x1b[0m');
}

function magenta(output) {
  console.log('\x1b[35m', output, '\x1b[0m');
}

module.exports = { red, green, blue, magenta };
