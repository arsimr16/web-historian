var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var baseUrl = path.paths.siteAssets();
    var endUrl = req.url;
    var url = baseUrl + endUrl;
    res.writeHead(200, headers);
    res.end(url);
  }
};
