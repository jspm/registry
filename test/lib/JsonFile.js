"use strict;"
var fs = require('fs');
var mout = require('mout');	
var extend = mout.object.deepMixIn;
var forOwn = mout.object.forOwn;

/**
 * @constructor JsonFile
 */		

var JsonFile = module.exports = function JsonFile(file){

	if( !(this instanceof JsonFile) )
		return new JsonFile(file);

	this._file = String(file);
	this._errors = this._errors || [];
	this._json = this._json || {};

	if( !(/\.json$/.test(file)) ){
		this.error(this._file + ' is not json file');
	
	} else {

		try{
			extend(this._json, require(this._file));

		} catch(e) {

			this.error(e.message);
		}

	}
};

JsonFile.prototype.error = function(msg){

	this._errors.push(msg);

	return this;
}

JsonFile.prototype.errors = function(){

	return this._errors;
}

JsonFile.prototype.forEach = function(fn){

	forOwn(this._json, fn, this);

	return this;	
};



