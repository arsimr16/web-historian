var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) { 
  fs.readFile(exports.paths.list, (err, data) => {
    if (err ) {
      console.log('ooops', err);
    }
    data = data.toString();
    data = data.split('\n');
    return callback(data);
  });
  
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      console.log('try again', err);
    }
    data = data.toString().split('\n');
    for (var i = 0; i < data.length; i++) {
      if (data[i] === url) {
        return callback(true);
      } 
    }
    return callback(false);
  });

};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      console.log('hey try again to add me to file', err);
    }
    callback();
  });
  
};

exports.isUrlArchived = function(url, callback) {

  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('ohhhhhh nooooooo', err);
    }
    for (var i = 0; i < files.length; i++) {
      if (files[i] === url) {
        return callback(true);
      }
    }
    return callback(false);
  });
  
};

exports.downloadUrls = function(urls) {
  console.log('Urls abt to download', urls);
  for (var i = 0; i < urls.length; i++) {
    var iffe = function(i) {
      http.get('http://' + urls[i], (res) => {
        fs.appendFile(exports.paths.archivedSites + '/' + urls[i], res.body, (err) => {
          if (err) {
            console.log('hahah try again some other time', err);
          }
        });
      });

    }(i);
  } 
};
