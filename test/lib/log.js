"use strict";

var util = require('util');
var mout = require('mout');
var colors = require('colors/safe');

var log = function(msg, color){

	if(colors[color])
		msg = colors[color](msg);

	console.log( msg );
	return log;
};

log.ok = function(msg){

	if(Array.isArray(msg))
	{
		msg.forEach(log.ok);
		return log;
	}

	return log( util.format( '✓ %s', msg), 'green');
};

log.error = function(msg){

	if(Array.isArray(msg))
	{
		msg.forEach(log.error);
		return log;
	}

	return log(util.format( '✗ %s', msg), 'red');
};

log.info = function(msg){

	if(Array.isArray(msg))
	{
		msg.forEach(log.info);
		return log;
	}

	return log(util.format( '  %s', msg), 'cyan');
};

log.n = function(count){

	count = mout.lang.isNumber(count) && count > 0 ? mout.number.toInt(count) : 0;
	return log(mout.string.repeat("\n", count));
}

module.exports = log;
