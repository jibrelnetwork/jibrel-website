var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(path.resolve(__dirname, 'public')));

var port = process.env.PORT || 3000;
app.listen(port);

console.log('server started ' + port);
