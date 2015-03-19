"use strict;"

var fs = require('fs');
var util = require('util');
var path = require('path');
var glob = require('glob');
var mout = require('mout');
var colors = require('colors/safe');
var JsonFile = require('./JsonFile');

var registries = {
	github: require('jspm-github'),
	npm: require('jspm-npm')
};

/**
 * @constructor OverrideFile
 */		
var OverrideFile = module.exports = function OverrideFile(endpoint){

	if( !(this instanceof OverrideFile) )
		return new OverrideFile(endpoint);

	this._endpoint = endpoint;
	this._files = [];
	this._errors = this._errors || [];
	this._registry;
	this._package;

	var match = /^([^:\s]*):([^\s]*)$/.exec(endpoint);

	if(!match)
	{
		this.error('invalid enpoint package');
	}
	else
	{
		this._registry = match[1];
		this._package = match[2];

		if(!registries[this._registry])
		{
			this.error('invalid registry');
		}
		else if(!registries[this._registry].packageFormat.test(this._package))
		{
			this.error('invalid pacakge name');
		}

		this._glob = path.resolve('./package-overrides', this._registry) + '/' + this._package + '@*.json';


		this._files = glob.sync(this._glob);
		this.forEach(function(file){

			var err = JsonFile(file).errors();

			if(err.length > 0)
				this.error(JsonFile(file).errors().join('\n'));

		});
	}

};

util.inherits(OverrideFile, JsonFile);

OverrideFile.prototype.error = function(msg){

	var result = '';
	result += this._endpoint ? colors.gray(this._endpoint) + ' ' : '';
	result += msg;

	return JsonFile.prototype.error.call(this, result);
};

OverrideFile.prototype.forEach = function(fn){

	mout.array.forEach(this._files, fn, this);

	return this;	
};

OverrideFile.prototype.isFile = function(){

	return this._files.length > 0;
};

