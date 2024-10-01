var express = require('express');
const cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

var packageJson = require('./node_modules/express/package.json');
console.log('[INFO] Package version: ' + packageJson.version);
console.log('[INFO] resolve express', require.resolve('express'));

app.get('/', function (req, res) {
  console.log('[INFO] clearCookie name', req.query.userId);

  res.clearCookie(req.query.userId);
  res.send('cookies cleared (hopefully)');
});

app.get('/set-bad-cookie-name', function (req, res) {
  console.log('[INFO] set-bad-cookie-name fired', req.query.userName);

  res.cookie(req.query.userName, 'someValue');
  res.send(
    '<h1>Bad Cookie set</h1><div><a href="/reflect-bad-name">Fire bad cookie</a></div>'
  );
});

// app.get('/set-bad-cookie-value', function (req, res) {
//   console.log('[INFO] set-bad-cookie-value fired', req.query.userName);

//   res.cookie('badCookieValue', req.query.userName);
//   res.send('Bad Cookie value set');
// });

app.get('/set-bad-cookie-domain', function (req, res) {
  console.log('[INFO] set-bad-cookie-domain fired', req.query.thisSite);
  res.cookie('badCookieDomain', 'some value', {
    domain: req.query.thisSite,
  });
  res.send(
    '<h1>Bad Cookie domain set in header</h1><div>Cookie Header: <br><pre>Set-Cookie: ' +
      res.getHeader('Set-Cookie') +
      '</pre></div>'
  );
});

app.get('/set-bad-cookie-path', function (req, res) {
  console.log('[INFO] set-bad-cookie-path fired', req.query.somePath);
  res.cookie('badCookiePath', 'some value', { path: req.query.somePath });
  res.send(
    '<h1>Bad Cookie path set in header</h1><div>Cookie Header: <br><pre>Set-Cookie: ' +
      res.getHeader('Set-Cookie') +
      '</pre></div>'
  );
});

// app.get('/set-good-cookie', function (req, res) {
//   console.log('[INFO] set-good-cookie fired', req.query.userProfile);
//   res.cookie(req.query.userProfile, 'someValue');
//   res.send('Good Cookie set');
// });

// app.get('/profile-id', function (req, res) {
//   console.log('[INFO] profile id cookies:', req.cookies);
//   const userId = req.cookies.userId;
//   res.send('<div>UserId: ' + userId + '</div>');
// });

app.get('/reflect-bad-cookie-name', function (req, res) {
  console.log('[INFO] profile name cookies:', req.cookies);
  const userId = req.cookies.userName;
  res.send('<div>UserName: ' + userId + '</div>');
});

// app.get('/profile-profile', function (req, res) {
//   console.log('[INFO] profile profile cookies:', req.cookies);
//   const userId = req.cookies.userProfile;
//   res.send('<div>UserName: ' + userId + '</div>');
// });

// app.get('/get-bad-cookie-value', function (req, res) {
//   console.log('[INFO] get bad cookie value:', req.cookies);
//   const userId = req.cookies.badCookieValue;
//   res.send('<div>UserId: ' + userId + '</div>');
// });

// function htmlEncode(str) {
//   return str.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
//     return '&#' + i.charCodeAt(0) + ';';
//   });
// }

app.listen(3000);
