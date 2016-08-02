const connect = require('connect')
const morgan = require('morgan')
const http = require('http')
const path = require('path')
const fs = require('fs')

var app = connect()

// setup the logger
app.use(morgan('combined', {
  immediate: true,
  stream: (new AccessLog).stream
}))
app.use(function(req, res){ res.end() })

//create node.js http server and listen on port
http.createServer(app).listen(3300)

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
