var connect = require('connect');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var fs = require('fs');

var logfile = path.join(__dirname, 'access.log')
var app = connect();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(logfile, {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// gzip/deflate outgoing responses
// var compression = require('compression');
// app.use(compression());

// store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));

// parse urlencoded request bodies into req.body
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());

// respond to all requests
app.use(function(req, res){
  res.end('Hey!');
});

//create node.js http server and listen on port
http.createServer(app).listen(3300);
