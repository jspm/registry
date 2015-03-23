'use strict';

var util = require('util');
var mout = require('mout');
var colors = require('colors/safe');
var registries = {
	github: require('jspm-github'),
	npm: require('jspm-npm')
};

var forOwn = mout.object.forOwn;
var gray = colors.gray;

var log = require('./lib/log');
var JsonFile = require('./lib/JsonFile');
var RegistryFile = require('./lib/RegistryFile');
var RegistryEntryCollection = require('./lib/RegistryEntryCollection');


//
// COMMANDER CONFIGURATION
//
var program = require('commander');
program
  .version('0.0.1')
  .usage('[options] <package ...>')
  .option('-e, --only-errors', 'Show only errors', 0)
  .parse(process.argv);



//
// LOG HELPERS
//

/**
 * @function error - log errors messages
 * @param  {String|Array} msg
 * @return {Function} error
 */
var error = function(msg){

	if(!program.onlyErrors)
		log.error(msg);

	if(Array.isArray(msg)) {
		error.summary.concat(msg);

	} else {
		error.summary.push(msg);

	}

	return error;
};

/**
 * @type {Array} list all errors
 */
error.summary = [];

/**
 * function ok - log validation passed messages
 * @param  {String|Array} msg
 * @return {Function} ok
 */
var ok = function(msg){

	if(!program.onlyErrors)
		log.ok(msg);

	return ok;
};

//
// VALIDATION PROCESS
//

/**
 * registry.json
 */
var registryFile = new RegistryFile();

if(registryFile.errors().length) {
	// json format errors
	error(registryFile.errors());

} else {
	ok('registry.json is valid json');

	registryFile.forEachPackage(function(pkg, name){

		// validate specific packages
		if(program.args.length) {

			var pos = program.args.indexOf(name);

			if(pos === -1)			
				return;

			// replace for test the package-override
			program.args[pos] = pkg.value;
		}

		if(!pkg.endpoint || !pkg.name)
			return error( util.format('%s not respects the format {ENDPOINT}:{PACKAGE_NAME}', gray(pkg.value)) );

		if(!registries[pkg.endpoint])
			return error( util.format('%s is not valid registry', gray(pkg.endpoint)) );

		if(!registries[pkg.endpoint].packageFormat.test( pkg.name ))
			return error( util.format('%s is not valid package name from %s endpoint', gray(pkg.name), gray(pkg.endpoint)) );

		ok( util.format('%s => %s', name, pkg.value) );
	});

}


/**
 * package overrides files
 */
forOwn(registries, function(endpointPackage, registryName){

	var registryEntryCollection = new RegistryEntryCollection(registryName);

	registryEntryCollection.forEachFile(function(fileinfo){

		if(fileinfo.ext !== 'json')
			return error( util.format('%s is not json file', gray(fileinfo.path)) );
			
		if(!fileinfo.packageName || !fileinfo.packageVersion)	
			return error( util.format('%s not respects the file name format {PACKAGE_NAME}@{PACKAGE_VERSION}.json', gray(fileinfo.path)) );

		if(!endpointPackage.packageFormat.test( fileinfo.packageName ))
			return error( util.format('%s is not valid package name from %s endpoint', gray(fileinfo.packageName), gray(fileinfo.endpoint)) );

		// validate specific packages
		if(program.args.length && program.args.indexOf(fileinfo.packageValue) === -1 )
			return;

		var jsonFile = new JsonFile(fileinfo.path);
		if(jsonFile.errors().length)
			return error( util.format('%s is not valid json file \n - %s', gray(fileinfo.path), jsonFile.errors().join('\n -')) );

		ok( fileinfo.packageValue + '@' + fileinfo.packageVersion );
	});

});


//
// SUMMARY LOG
//

if(error.summary.length) {
	log.n()
		('Error summary ................')
		.error(error.summary)
		.n();

	process.exit(1);

}

log.n()
	('errorSummary ................')
	.ok('excellent!! all is well.')
	.n();

process.exit(0);