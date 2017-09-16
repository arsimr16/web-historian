var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
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
    var baseUrl = archive.paths.siteAssets;
    var url = baseUrl + req.url + 'index.html';
    fs.readFile(url, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        res.end(data);
      } else {
        res.writeHead(200, headers);
        res.end(data); 
      }
    });
    //res.writeHead(200, headers);
    //res.end(url); 
    
  }

  
};
