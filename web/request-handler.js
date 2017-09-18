var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if ((/\/www./).test(req.url)) {
      var baseUrl = archive.paths.archivedSites;
      var url = baseUrl + req.url;
    } else if ((/.css/).test(req.url)) {
      var baseUrl = archive.paths.siteAssets;
      var url = baseUrl + req.url;
    } else if ((/^\/$/).test(req.url)) {
      
      var baseUrl = archive.paths.siteAssets;
      
      var url = baseUrl + req.url + 'index.html';
    } else {
      var url = archive.paths.archivedSites + req.url;
    }
   
    fs.readFile(url, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        res.end(data);
        
      } else {
        res.writeHead(200, headers);
        res.end(data); 
      }
    });
  }

  if (req.method === 'POST') {
      
    var reqData = [];
    req.on('data', (chunk) => {
      reqData.push(chunk);
    });
    req.on('end', () => {
      var urlString = reqData.toString().slice(4);
      
      archive.isUrlArchived(urlString, (boolean) => {
        if (boolean) {
          fs.readFile(archive.paths.archivedSites + '/' + urlString, (err, file) => {
            if (err) {
              console.log('error', err);
            } else {
              res.writeHead(302, headers);
              res.end(file.toString());
            }
          });
        } else {
          archive.isUrlInList(urlString, (boolean) => {
            if (boolean) {
              fs.readFile(archive.paths.siteAssets + '/loading.html', (err, file) => {
                if (err) {
                  console.log(err);
                } else {
                  res.writeHead(302, headers);
                  res.end(file.toString());
                }
              });
            } else {
              archive.addUrlToList(urlString, () => {
                fs.readFile(archive.paths.siteAssets + '/loading.html', (err, file) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.writeHead(302, headers);
                    res.end(file.toString());
                  }
                });
              });
            }
          });
        }
      });




    });

     
  }
};










