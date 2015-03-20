"use strict";

var log = require('./lib/log');
var RegistryFile = require('./lib/RegistryFile');
var OverrideFile = require('./lib/OverrideFile');
var summary = [];

/**
 * Commander
 */
var program = require('commander');
program
  .version('0.0.1')
  .usage('[options] <package ...>')
  .option('-e, --only-errors', 'Show only summary', 0)
  .parse(process.argv);


/**
 * registry.json
 */
var registry = RegistryFile();
if(registry.errors().length)
{
	summary = summary.concat(registry.errors());
	log.error(registry.errors());
	process.exit(1);
}

// log ok
if(!program.onlyErrors)
	log.ok('registry.json');


/**
 * Packages
 */
registry.forEach(function(endpoint, name){

	if(program.args.length && program.args.indexOf(name) === -1)
		return;

	var override = new OverrideFile(endpoint);

	if(override.errors().length) {

		var errorDescription = name + ' => ' + endpoint + '\n\t' + override.errors().join('\n\t');
		summary.push(errorDescription);

	} else if(!program.onlyErrors) {
		log.ok(name + ' => ' + endpoint);

		if(!override.isFile())
			log.info(' not override file from ' + name);
	}

});


/**
 * Summary
 */
if(summary.length) {
	log.n()
		('Error summary ................')
		.error(summary)
		.n();

	process.exit(1);

}

log.n()
	('Summary ................')
	.ok('excellent!! all is well.')
	.n();

process.exit(0);