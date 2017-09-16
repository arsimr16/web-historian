var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  //  read file 
  fs.readFile(exports.paths.list, (err, data) => {
    if (err ) {
      console.log('ooops', err);
    }
    data = data.toString();
    data = data.split('\n');
    return callback(data);
  });
    // return a whole file
  // run callback on the whole file
  
  // for each item in url list
  // calls callback on each item 
  
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      console.log('try again', err);
    }
    data = data.toString().split('\n');
    console.log('check me out i should be an array', data);
    for (var i = 0; i < data.length; i++) {
      if (data[i] === url) {
        return callback(true);
      } 
    }
    return callback(false);
  });
  
  //  returns a boolean
  //  if false, run callback (addUrlToList)
  //  if true, run call
};

exports.addUrlToList = function(url, callback) {
  //  add newline character
    //  add url
  fs.appendFile(exports.paths.list, '\n' + url, (err) => {
    if (err) {
      console.log('hey try again to add me to file', err);
    }
  });
  callback();
  
};

exports.isUrlArchived = function(url, callback) {
  //  find the archives folder
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('ohhhhhh nooooooo', err);
    }
    console.log('looooooooooooooooooooook', files);
    for (var i = 0; i < files.length; i++) {
      if (files[i] === url) {
        callback(true);
      }
    }
    //  loop through folder and check against url
      //  if it does, callback(true)
      //  callback(false)
    callback(false);
  });
  
};

exports.downloadUrls = function(urls) {
};
