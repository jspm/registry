'use strict';

var util = require('util');
var mout = require('mout');
var cyan = require('colors/safe').cyan;
var forEach = mout.array.forEach;
var isEmpty = mout.lang.isEmpty;
var deepClone = mout.lang.deepClone;
var objectUnset = mout.object.unset;

var JsonFile = require('./JsonFile');
var ALLOWED_PROPERTIES = [
	'main',
	'registry',
	'dependencies',
	'devDependencies',
	'directories.lib',
	'directories.dist',
	'format',
	'map',
	'files',
	'ignore',
	'shim',

	'jspmNodeConversion',
	'browser'
];

/**
 * @constructor PackageOverrideFile
 */
var PackageOverrideFile = module.exports = function PackageOverrideFile(file){

	if( !(this instanceof PackageOverrideFile) )
		return new PackageOverrideFile();

	JsonFile.call(this, file);

	if(!this.hasErrors())
	{
		var notAllowedProperties = deepClone(this._json);

		forEach(ALLOWED_PROPERTIES, function(allowedProperty){

			objectUnset(notAllowedProperties, allowedProperty);

		});

		if(isEmpty(notAllowedProperties.directories))
			objectUnset(notAllowedProperties, 'directories');

		if(!isEmpty(notAllowedProperties))
			this.error( this._file + ' contains not allowed properties: \n\t' + cyan( JSON.stringify(notAllowedProperties) ) );
	}

};

util.inherits(PackageOverrideFile, JsonFile);