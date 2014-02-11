
System.paths['npm:*'] = 'jspm_packages/npm/*.js';
System.paths['github:*'] = 'jspm_packages/github/*.js';
System.paths['registry-tests/*'] = 'tests/*.js';
System.paths['tests/*'] = 'tests/*.js';

System.map = {
  'mocha': 'npm:mocha@^1.17.1',
  'angular': 'github:angular/bower-angular@^1.2.12',
  'text': 'github:systemjs/plugin-text@master',
  'npm:mocha@1.17.1': {
    'css': 'github:systemjs/plugin-css@master'
  }
};

System.versions = {
  'github:angular/bower-angular': '1.2.12',
  'npm:mocha': '1.17.1',
  'github:systemjs/plugin-css': 'master',
  'github:systemjs/plugin-text': 'master'
};

