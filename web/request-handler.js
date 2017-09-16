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
  // how to tell diff between / AND /style.css vs. /www.google.com AND /www.walmart.com
  if (req.method === 'GET') {
    if ((/\/www./).test(req.url)) {
      // return archived page
    } else if ((/\/style.css/).test(req.url)) {
      // return the css page inside web/public
    } else if ((/\//).test(req.url)) {
      //return index.html from web/public
    }
    // console.log('LOOOOOOOOOK ATTTTTT MEEEEE', req);
    var baseUrl = archive.paths.siteAssets;
    console.log('--------------------------', req.path);
    var url = baseUrl + req.url + '/index.html';
    //var archiveUrl = archive.paths.archivedSites + req.url;
    //console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY', url);
    fs.readFile(url, (err, data) => {
      console.log('url!!!!!!!!!1', url);
      //console.log('DDDDDDDDDDAAAAAAAAAATTTTTTTTAAAAAAAA', data);
      if (err) {
        res.writeHead(404, headers);
        res.end(data);
        console.log('ERRRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRR', err);
      } else {
        res.writeHead(200, headers);
        res.end(data); 
      }
    });
    //res.writeHead(200, headers);
    //res.end(url); 
    
  }

  
};
