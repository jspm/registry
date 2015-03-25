'use strict';

var util = require('util');
var path = require('path');
var JsonFile = require('./JsonFile');
var CANONICAL_NAME_EXPECTATION = /^([^:\s]*):([^\s]*)$/;

/**
 * @constructor OverrideFile
 */
var OverrideFile = module.exports = function OverrideFile(){

	if( !(this instanceof OverrideFile) )
		return new OverrideFile();

	JsonFile.call(this, path.resolve('./registry.json'));
};

util.inherits(OverrideFile, JsonFile);

OverrideFile.prototype.forEachRegistryEntry = function(fn){

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