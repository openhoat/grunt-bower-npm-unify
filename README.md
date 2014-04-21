[![Build Status](https://travis-ci.org/openhoat/grunt-bower-npm-unify.png?branch=master)](https://travis-ci.org/openhoat/grunt-bower-npm-unify)

Fed up with maintaining your bower.json and package.json files with redundant informations ?
Then, you're at the good place :-)

## What's grunt-bower-npm-unify?

grunt-bower-npm-unify is a Grunt task that populates your bower.json from your package.json.
All generic informations (except specific npm ones) specified in your package.json are populated in bower.json.

## Installation

    # npm install grunt-bower-npm-unify --save-dev

## Usage

    # grunt bowerNpmUnify

## Configuration

Add bowerNpmUnify options in your Gruntfile.js :

For example, here's the default configuration :

    grunt.initConfig({
        ...
        bowerNpmUnify: {
            options: {
                npm: 'package.json',
                bower: 'bower.json',
                excludeProperties: [
                  'files', 'main', 'bin', 'man', 'directories', 'scripts', 'config',
                  'dependencies', 'devDependencies', 'bundledDependencies', 'optionalDependencies',
                  'engines', 'engineStrict', 'os', 'cpu', 'preferGlobal', 'publishConfig'
                ],
                dest: 'bower.json'
            }
        },
        ...
    });

If your needs match this, you don't have to change your Gruntfile.js
The configuration you specify will override the default one.

Example of customization :

    grunt.initConfig({
        ...
        bowerNpmUnify: {
            options: {
                npm: 'package.json',
                bower: './lib/bower.json', // custom location
                excludeProperties: [
                  'files', 'main', 'bin', 'man', 'directories', 'scripts', 'config',
                  'dependencies', 'devDependencies', 'bundledDependencies', 'optionalDependencies',
                  'engines', 'engineStrict', 'os', 'cpu', 'preferGlobal', 'publishConfig',
                  'version' // added property to exclude
                ],
                dest: './dist/bower.json' // create another file instead of writing into the existing one
            }
        },
        ...
    });

Enjoy !