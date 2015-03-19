"use strict;"
var util = require('util');
var path = require('path');
var JsonFile = require('./JsonFile');

/**
 * @constructor RegistryFile
 */		

var RegistryFile = module.exports = function RegistryFile(){

	if( !(this instanceof RegistryFile) )
		return new RegistryFile();

	JsonFile.call(this, path.resolve('./registry.json'));
};


util.inherits(RegistryFile, JsonFile);