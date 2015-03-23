'use strict';

var util = require('util');
var path = require('path');
var JsonFile = require('./JsonFile');
var CANONICAL_NAME_EXPECTATION = /^([^:\s]*):([^\s]*)$/;

/**
 * @constructor RegistryFile
 */
var RegistryFile = module.exports = function RegistryFile(){

	if( !(this instanceof RegistryFile) )
		return new RegistryFile();

	JsonFile.call(this, path.resolve('./registry.json'));
};

util.inherits(RegistryFile, JsonFile);

RegistryFile.prototype.forEachRegistryEntry = function(fn){

	return this.forEach(function(canonicalPackageName, registryEntryName){

		var pkg = {};
		var match = CANONICAL_NAME_EXPECTATION.exec(canonicalPackageName);

		if (!match) {
			pkg = {
				canonical: canonicalPackageName,
				endpoint: undefined,
				name: undefined,
			};
		
		} else {
			pkg = {
				canonical: match[0], 
				endpoint: match[1],
				name: match[2],
			};
		}

		fn.call(this, pkg, registryEntryName);
	});

};