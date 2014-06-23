jspm Registry
---

[View the registry file here](https://github.com/jspm/registry/blob/master/registry.json)

Pull requests welcome for `registry.json` to add or modify entries.

All registry entries are managed here through Github, moderated by the registry maintainers.

Registry
---

Modules are served from _endpoint servers_. Endpoints include `github:` and `npm:`.

When requesting a module such as `github:twbs/bootstrap@3.0/js/bootstrap.js`, this corresponds to the URL 
`https://github.jspm.io/twbs/bootstrap@3.0/js/bootstrap.js` and the **GitHub endpoint**, returns the associated code.

The registry simply remembers the `github:twbs/bootstrap` part, allowing the shortcut form:

```javascript
  System.import('bootstrap@3.0/js/bootstrap');
```

The `registry.json` is just a collection of these mappings:

```javascript
  "bootstrap": "github:twbs/bootstrap"
```

Anyone is welcome to submit a mapping.

The current supported endpoint servers are:

* Github (SPDY optimized)
* npm (SPDY optimized)

Package.json Overrides
---

The registry also provides a service for overriding the `package.json` of existing repos.

This is useful for enabling jspm functionality in the `package.json` when direct access to the underlying repo is not possible.

This is because jspm uses the `package.json` for modular package configuration, including:

* Setting the main entry point (`main`)
* Shim config for globals (`shim`)
* Map configuration (`map`)
* Module format (`format`)
* Auto-enabling minification (`buildOptions.minify`)

In this way, the right package options can make any package play well with jspm, without needing any manual configuration at all.

Submitting a pull request to the original repo is still preferable to package overrides, this is a convenience service only and not a long term solution.

Read more about [configuring packages for jspm](https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm) in the wiki.

Some examples of package.json overrides for common packages:
* [Bootstrap](https://github.com/jspm/registry/blob/master/package-overrides/github/twbs/bootstrap%403.0.2.json)
* [Backbone Marionette](https://github.com/jspm/registry/blob/master/package-overrides/github/marionettejs/backbone.marionette%401.2.2.json)

Further examples of jspm package.json files for common packages can be found in the [package overrides](https://github.com/jspm/registry/tree/master/package-overrides) section of the registry. Pull requests are encouraged.

### Testing Package Overrides

Package overrides may take some testing to get exactly the right configuration.

See the [testing guide within Configuration Packages for jspm](https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm#testing-configuration).

### Submitting a Package Override

To submit a new package override:

* Fork this repo, then create the file `package-overrides/[endpoint name]/[repo name]@x.y.z.json`.
* Provide the correct configuration according to the configuration guide above.
* Submit a pull request.
* If the configuration is correct, this will be accepted and that will instantly enable the functionality on the endpoint.

The overrides only apply to exact version, tag or branch names. When set to an exact semver version, the override will apply for all semver versions greater than that version.



