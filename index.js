const parseArgs = require('minimist')
const naceServer = require('./nace-server')

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version',
    p: 'port'
  }
})

const port = argv.port || 3300
naceServer.start({
  port: port
}).then(() => {
  console.log(`\x1b[32;1m✓\x1b[0m nace is running at http://localhost:${port}/`)
}).catch(err => {
  switch (err.code) {
    case 'EADDRINUSE':
      console.log(`\n\x1b[41;30m ERR \x1b[0m Port ${err.port} is in used.\n`)
      process.exit(1)
    default:
      console.log(err)
      process.exit(100)
  }
})
