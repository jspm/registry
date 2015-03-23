'use strict';

var path = require('path');
var glob = require('glob');
var mout = require('mout');
var forOwn = mout.object.forOwn;
var FILE_EXTENSION = /[^.]*$/i;
var PACKAGE_EXPECTATION = /(.*)@(.*).json$/;

/**
 * @constructor RegistryEntry
 */		

var RegistryEntryCollection = module.exports = function RegistryEntry(endpoint){

	this._endpoint = endpoint;
	this._basePath = path.resolve('./package-overrides', this._endpoint);
	this._files = glob.sync('**/*', {cwd: this._basePath, nodir: true});

};

RegistryEntryCollection.prototype.forEachFile = function(fn){

	forOwn(this._files, function(file, index){

		var pathfile = path.resolve(this._basePath, file);
		var extfile = FILE_EXTENSION.exec(pathfile)[0];

		var fileinfo = {
			packageName: undefined,
			packageVersion: undefined,
			packageValue: undefined,

			file: file,
			endpoint: this._endpoint,
			path: pathfile,
			ext: extfile
		};

		var match = PACKAGE_EXPECTATION.exec(file);

		if (match) {
			fileinfo.packageName = match[1];
			fileinfo.packageVersion = match[2];
			fileinfo.packageValue = fileinfo.endpoint + ':' + fileinfo.packageName;
		}

		fn.call(this, fileinfo, index);

	}, this);

	return this;
}
