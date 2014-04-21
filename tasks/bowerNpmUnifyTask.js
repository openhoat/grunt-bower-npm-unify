'use strict';

var _ = require('lodash')
  , populateBower = require('../lib/populate-bower');

module.exports = function (grunt) {
  grunt.registerTask('bowerNpmUnify', 'Populate bower.json file from package.json file.', function () {
    var done, options;
    done = this.async();
    options = this.options({
      npm: 'package.json',
      bower: 'bower.json',
      excludeProperties: [
        'files', 'main', 'bin', 'man', 'directories', 'scripts', 'config',
        'dependencies', 'devDependencies', 'bundledDependencies', 'optionalDependencies',
        'engines', 'engineStrict', 'os', 'cpu', 'preferGlobal', 'publishConfig'
      ]
    });
    options.dest = options.dest || options.bower;
    populateBower(options, function (err, result) {
      if (err) {
        grunt.log.error();
        grunt.fail.warn('Error', err);
        return;
      }
      grunt.file.write(options.dest, JSON.stringify(result, null, 2));
      done();
    });
  });
};
