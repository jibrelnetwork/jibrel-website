var express = require('express');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));

app.get('/ko', function(req, res, next) {
  res.redirect('/index-ko.html')
})

var port = process.env.PORT || 3000;
app.listen(port);

console.log('server started ' + port);
