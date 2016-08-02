const nace = require('./nace-server')
const port = 3300

nace.start({
  port: port
}, function (server) {
  console.log(`Nace server started on port ${port}`)
})
