jspm Registry
---

[View the registry file here](https://github.com/jspm/registry/blob/master/registry.json)

Pull requests welcome for `registry.json` to add or modify entries.

All registry entries are managed here through Github, moderated by the registry maintainers.

What it does
---

### 1. Endpoint Mappings (registry.json)

Modules are served from _endpoint servers_. Endpoints include `github:`, `npm:` and `cdnjs:`, and anyone can submit a new endpoint, provided it meets [certain requirements](https://github.com/jspm/registry/wiki/Endpoint-Conventions).

If I want to load Twitter Bootstrap directly from the Github endpoint, I would write the following:

```javascript
  System.import('github:twbs/bootstrap@3.0/js/bootstrap');
```

The loader then sends a request to the URL `https://github.jspm.io/twbs/bootstrap@3.0/js/bootstrap.js` and the **Github endpoint server**, returns the associated code.

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
* gist (SPDY optimized)
* cdnjs

For more information on endpoints, read the [Endpoint Conventions guide](https://github.com/jspm/registry/wiki/Endpoint-Conventions).

### 2. Package.json Overrides (package_overrides)

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

To submit a new package override:

* Fork this repo, then create the file `package_overrides/[endpoint name]/[repo name]@x.y.z.json.
* Provide the correct configuration according to the configuration guide above.
* Submit a pull request.
* If the configuration is correct, this will be accepted and that will instantly enable the functionality on the endpoint.

The overrides only apply to exact version, tag or branch names.

Note that package overrides do not work for the cdnjs endpoint, so manual configuration is still necessary here.



