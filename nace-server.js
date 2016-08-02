const connect = require('connect')
const morgan = require('morgan')
const http = require('http')
const path = require('path')
const fs = require('fs')

function launchServer (args, callback) {
  args = Object.assign({
    port: 3300,
    cb: function () {}
  }, args, { cb: callback })

  const app = connect()

  // setup the logger
  app.use(morgan('combined', {
    immediate: true,
    stream: (new AccessLog).stream
  }))
  app.use(function(req, res){ res.end() })

  http.createServer(app).listen(args.port, args.cb)
}

function AccessLog () {
  const that = this
  function updateAccessLogStream () {
    const timestamp = (new Date).toISOString().replace(/T.*/, '')
    const logfile = path.join(__dirname, `access-${timestamp}.log`)
    that.stream = fs.createWriteStream(logfile, {flags: 'a'})
  }
  setInterval(updateAccessLogStream, 60000)
  updateAccessLogStream()
}

module.exports = {
  start: launchServer
}
