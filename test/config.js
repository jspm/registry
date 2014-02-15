
System.paths['tests/*'] = 'tests/*.js';
System.paths['npm:*'] = 'jspm_packages/npm/*.js';
System.paths['github:*'] = 'jspm_packages/github/*.js';

System.map = {
  'mocha': 'npm:mocha@^1.17.1',
  'text': 'github:systemjs/plugin-text@master',
  'bootstrap': 'github:twbs/bootstrap@^3.1.1',
  'css': 'github:systemjs/plugin-css@master',
  'jquery': 'npm:jquery@^2.1.0',
  'd3': 'github:mbostock/d3@^3.4.1',
  'angular': 'github:angular/bower-angular@^1.2.13',
  'npm:mocha@1.17.1': {
    'css': 'github:systemjs/plugin-css@master'
  },
  'github:jspm/nodelibs@0.0.2': {
    'inherits': 'npm:inherits@^2.0.1',
    'ieee754': 'npm:ieee754@^1.1.1',
    'Base64': 'npm:Base64@^0.2.0',
    'base64-js': 'npm:base64-js@^0.0.4'
  }
};

System.versions = {
  'github:angular/bower-angular': '1.2.13',
  'npm:mocha': '1.17.1',
  'github:systemjs/plugin-css': 'master',
  'github:systemjs/plugin-text': 'master',
  'github:twbs/bootstrap': '3.1.1',
  'npm:jquery': '2.1.0',
  'github:jspm/nodelibs': '0.0.2',
  'npm:inherits': '2.0.1',
  'npm:ieee754': '1.1.2',
  'npm:Base64': '0.2.0',
  'npm:base64-js': '0.0.4',
  'github:mbostock/d3': '3.4.1'
};

