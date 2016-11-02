/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {})
  app.import('bower_components/three.js/three.js')
  return app.toTree()
}
