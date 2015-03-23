'use strict';

var util = require('util');
var path = require('path');
var JsonFile = require('./JsonFile');
var PACKAGE_EXPECTATION = /^([^:\s]*):([^\s]*)$/;

/**
 * @constructor RegistryFile
 */		

var RegistryFile = module.exports = function RegistryFile(){

	if( !(this instanceof RegistryFile) )
		return new RegistryFile();

	JsonFile.call(this, path.resolve('./registry.json'));
};

util.inherits(RegistryFile, JsonFile);

RegistryFile.prototype.forEachPackage = function(fn){

	return this.forEach(function(redirection, name){

		var pkg = {};
		var match = PACKAGE_EXPECTATION.exec(redirection);

		if (!match) {
			pkg = {
				value: redirection,
				endpoint: undefined,
				name: undefined,
			};
		
		} else {
			pkg = {
				value: match[0], 
				endpoint: match[1],
				name: match[2],
			};

		}

		fn.call(this, pkg, name);

	});
};