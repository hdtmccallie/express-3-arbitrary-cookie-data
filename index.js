var express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

var app = express();
app.use(cookieParser());

var packageJson = require('./node_modules/express/package.json');
console.log('[INFO] Package version: ' + packageJson.version);

app.get('/', function (req, res) {
  console.log('Response Headers:', res.getHeaders());
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/set-bad-cookie-name', function (req, res) {
  res.cookie(req.query.userName, 'someValue');
  res.send(
    '<h1>Bad Cookie set</h1><div><a href="/reflect-bad-cookie-name">Reflect bad cookie (XSS Alert)</a></div>'
  );
});

app.get('/set-bad-cookie-domain', function (req, res) {
  // console.log('[INFO] set-bad-cookie-domain fired', req.query.thisSite);
  res.cookie('badCookieDomain', 'some value', {
    domain: req.query.thisSite,
  });
  res.send(
    '<h1>Bad Cookie domain set in header</h1><div>Cookie Header: <br><pre style="background-color: lightgray; padding: 1rem;">Set-Cookie: ' +
      res.getHeader('Set-Cookie') +
      '</pre></div>'
  );
});

app.get('/set-bad-cookie-path', function (req, res) {
  // console.log('[INFO] set-bad-cookie-path fired', req.query.somePath);
  res.cookie('badCookiePath', 'some value', { path: req.query.somePath });
  res.send(
    '<h1>Bad Cookie path set in header</h1><div>Cookie Header: <br><pre style="background-color: lightgray; padding: 1rem;">Set-Cookie: ' +
      res.getHeader('Set-Cookie') +
      '</pre></div>'
  );
});

app.get('/reflect-bad-cookie-name', function (req, res) {
  console.log('[INFO] profile name cookies:', req.cookies);
  const userId = req.cookies.userName;
  res.send('<div>UserName: ' + userId + '</div>');
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(3000);
