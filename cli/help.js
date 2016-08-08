const path = require('path')

const helpText = `
  Usage

    $ nace <command> <options>

  Commands

    start               Start nace server.
    stop                Stop nace server.
    check               Check if nace running.

    Options

    -p, --port <port>   Port to listening (default: 3300).
`

module.exports = {
  printHelp: function () {
    process.stdout.write(helpText)
    return true
  },
  printVersion: function () {
    const version = 'v' + require(path.join(__dirname, '../package.json')).version
    process.stdout.write(version + '\n')
    return true
  },
}
