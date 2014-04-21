'use strict';

var path = require('path')
  , chai = require('chai')
  , Q = require('q')
  , populateBower = require('../lib/populate-bower')
  , expect = chai.expect
  , baseDir;

baseDir = path.join(__dirname, '..');

describe('populate-bower', function () {

  function testPopulateBower(useCase, done) {
    Q().
      then(function () {
        var deferred = Q.defer();
        populateBower(useCase.options, deferred.makeNodeResolver());
        return deferred.promise;
      }).
      then(function (result) {
        expect(result).to.eql(useCase.expected);
        done();
      }).
      catch(done);
  }

  it('should populate bower.json from package.json', function (done) {
    var useCases = [
      {
        options: {
          npm: {
            name: 'sample-package1',
            version: '1.2.3',
            description: 'A sample package for test purpose',
            author: {
              name: 'John Doe',
              email: 'john@doe.com'
            },
            dependencies: {
              anydep: '3.4.5'
            },
            devDependencies: {
              anydevdep: '6.7.8'
            }
          },
          bower: {
            dependencies: {
              jquery: '2.1.0',
              json3: '3.3.1'
            }
          }
        },
        expected: {
          name: 'sample-package1',
          version: '1.2.3',
          description: 'A sample package for test purpose',
          author: {
            name: 'John Doe',
            email: 'john@doe.com'
          },
          dependencies: {
            jquery: '2.1.0',
            json3: '3.3.1'
          }
        }
      },
      {
        options: {
          npm: {
            name: 'sample-package2',
            version: '1.2.3',
            description: 'A sample package for test purpose',
            author: {
              name: 'John Doe',
              email: 'john@doe.com'
            }
          },
          bower: {}
        },
        expected: {
          name: 'sample-package2',
          version: '1.2.3',
          description: 'A sample package for test purpose',
          author: {
            name: 'John Doe',
            email: 'john@doe.com'
          }
        }
      }
    ];
    Q().
      then(function () {
        var promises = [];
        useCases.forEach(function (useCase) {
          var deferred = Q.defer();
          promises.push(deferred.promise);
          testPopulateBower(useCase, deferred.makeNodeResolver());
        });
        return Q.all(promises);
      }).
      then(function () {
        done();
      }).
      catch(done);
  });
});