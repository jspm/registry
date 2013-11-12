JSPM Registry
---

Pull requests welcome. View `registry.json` to see what is currently in the registry.

All registry entries are managed through Github, moderated by the registry maintainers.

What it does
---

### 1. Endpoint Mappings (registry.json)

Modules are served from _endpoint servers_. Endpoints include `github:`, `npm:` and `cdnjs:`, and anyone can submit a new endpoint, provided it meets certain requirements.

If I want to load Twitter Bootstrap with the [JSPM loader](https://github.com/jspm/jspm-loader), I would write the following:

```javascript
  jspm.import('github:twbs/bootstrap@3.0/js/bootstrap');
```

The registry simply remembers the `github:twbs/bootstrap` part, allowing the shortcut form:

```javascript
  jspm.import('bootstrap@3.0/js/bootstrap');
```

Anyone can submit a new endpoint server to use, simply provide a pull request to `endpoints.json`.

### 2. Package.json Overrides (package_overrides)

The registry also provides a service for overriding the `package.json` of existing repos.

This is because JSPM uses the `package.json` for modular package configuration, including:

* Setting the main entry point (`main`)
* Shim config for globals (`shim`)
* Auto-enabling minification (`buildOptions.uglify`)

In this way, the right package options can make any library play well with JSPM, without needing any manual configuration at all.

Read more about [configuring libraries for JSPM](https://github.com/jspm/registry/wiki/) in the wiki.
