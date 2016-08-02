const Monitor = require('forever-monitor').Monitor

const nace = new Monitor('index.js', {
  max: 3,
  silent: true,
  args: []
})
