
System.paths['tests/*'] = 'tests/*.js';
System.paths['npm:*'] = 'jspm_packages/npm/*.js';
System.paths['github:*'] = 'jspm_packages/github/*.js';

System.map = {
  'angular': 'github:angular/bower-angular@^1.2.12',
  'mocha': 'npm:mocha@^1.17.1',
  'text': 'github:systemjs/plugin-text@master',
  'bootstrap': 'github:twbs/bootstrap@^3.1.1',
  'jquery': 'github:components/jquery@^2.1.0',
  'css': 'github:systemjs/plugin-css@master',
  'npm:mocha@1.17.1': {
    'css': 'github:systemjs/plugin-css@master'
  }
};

System.versions = {
  'github:angular/bower-angular': '1.2.12',
  'npm:mocha': '1.17.1',
  'github:systemjs/plugin-css': 'master',
  'github:systemjs/plugin-text': 'master',
  'github:twbs/bootstrap': '3.1.1',
  'github:components/jquery': '2.1.0'
};

