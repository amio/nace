const connect = require('connect')
const morgan = require('morgan')
const http = require('http')
const path = require('path')
const fs = require('fs')

function launchServer (args, callback) {
  const logDir = args.logDir || process.cwd()
  return new Promise(function(resolve, reject) {
    const app = connect()

    // setup the logger
    app.use(morgan('combined', {
      immediate: true,
      stream: (new AccessLog(logDir)).stream
    }))
    app.use(function(req, res){ res.end() })

    const server = http.createServer(app)
    server.on('error', err => reject(err))
    server.listen(args.port, resolve)
  })
}

function AccessLog (logDir) {
  const that = this
  function updateAccessLogStream () {
    const timestamp = (new Date).toISOString().replace(/T.*/, '')
    const logfile = path.join(logDir, `access-${timestamp}.log`)
    that.stream = fs.createWriteStream(logfile, {flags: 'a'})
  }
  setInterval(updateAccessLogStream, 60000)
  updateAccessLogStream()
}

module.exports = {
  start: launchServer
}
