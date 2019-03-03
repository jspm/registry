jspm Registry
---

or view the raw registry file at https://github.com/jspm/registry/blob/master/registry.json.

Pull requests welcome for `registry.json` and the `package_overrides` folder.

All registry entries are managed here through GitHub, moderated by the registry maintainers.

Registry
---

The currently supported endpoints are:

* Github
* npm

The registry provides a simple mapping in the file [`registry.json`](https://github.com/jspm/registry/blob/master/registry.json), which maps a shortname (`bootstrap`) to a canonical endpoint name (`github:twbs/bootstrap`). It is simply a convenience for installing through jspm.

Package.json Overrides
---

The registry also provides a service for overriding the `package.json` of existing repos.

This is useful for enabling jspm functionality in the `package.json` when direct access to the underlying repo is not possible.

jspm uses the `package.json` for modular package configuration, including:

* Setting the main entry point (`main`)
* Shim config for globals (`shim`)
* Map configuration (`map`)
* Module format (`format`)

In this way, the right package options can make any package play well with jspm, without needing any manual configuration at all.

> Submitting a pull request to the original repo should be done at the same time as this is designed as a temporary service only and not a long term solution to the configuration problem.

Read more about [configuring packages for jspm](https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm) in the wiki.

Examples of jspm package.json files for common packages can be found in the [package overrides](https://github.com/jspm/registry/tree/master/package-overrides) section of the registry.

### Testing Package Overrides

Package overrides may take some testing to get exactly the right configuration.

See the [testing guide within Configuration Packages for jspm](https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm#testing-configuration).

### Submitting a Package Override

To submit a new package override:

* Fork this repo, then create the file `package-overrides/[endpoint name]/[repo name]@x.y.z.json`.
* Provide the correct configuration according to the configuration guide above.
* Submit a pull request.
* If the configuration is correct, this will be accepted and that will instantly enable the functionality on the endpoint.

> The overrides will apply for all versions semver compatible with the override version, with the highest version override taking precedence.

### Registry Maintainers

Anyone is welcome to assist with reviewing override changes. Overrides are reviewed based on checking syntax, backwards-compatibility and best-practises. The registry maintainers are selected based on their ability to implement
these guidelines. The goal is for this to be a diverse group across timezones to provide prompt reviews for overrides.
