'use strict';

var _ = require('lodash')
  , Q = require('q')
  , fs = require('fs');

module.exports = function (options, callback) {
  var npm, bower;
  options.excludeProperties = options.excludeProperties || [
    'files', 'main', 'bin', 'man', 'directories', 'scripts', 'config',
    'dependencies', 'devDependencies', 'bundledDependencies', 'optionalDependencies',
    'engines', 'engineStrict', 'os', 'cpu', 'preferGlobal', 'publishConfig'
  ];
  Q().
    then(function () {
      var deferred = Q.defer();
      if (typeof options.npm === 'string') {
        fs.readFile(options.npm, { encoding: 'utf-8' }, deferred.makeNodeResolver());
      } else {
        deferred.resolve(options.npm);
      }
      return deferred.promise;
    }).
    then(function (content) {
      npm = typeof content === 'string' ? JSON.parse(content) : content;
    }).
    then(function () {
      var deferred = Q.defer();
      if (typeof options.bower === 'string') {
        fs.readFile(options.bower, { encoding: 'utf-8' }, deferred.makeNodeResolver());
      } else {
        deferred.resolve(options.bower);
      }
      return deferred.promise;
    }).
    then(function (content) {
      bower = typeof content === 'string' ? JSON.parse(content) : content;
    }).
    then(function () {
      var result = _.merge(_.omit(npm, options.excludeProperties), bower);
      callback(null, result);
    }).
    catch(callback);
};
