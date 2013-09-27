JSPM Registry
---

Pull requests welcome!

The JSPM Registry is a loader baseURL located at `https://registry.jspm.io`, providing common dependency-managed libraries.

For example, jquery is located at `https://registry.jspm.io/jquery.js`, or `https://registry.jspm.io/jquery@2.0.3.js`.

While the registry is small enough, all registry entries are managed through Github, moderated by the registry maintainers.

* The registry provides a mapping from a _unique registry name_ to a _target package_:
  
  ```
   "bootstrap": "github:twbs/bootstrap"
  ```
* For ease of reference, please ensure new names are added in the correct alphabetical location.
* Currently the following SPDY-optimized _location services_ are available in the registry mapping:
  * Github: `github:author/repo`
  * NPM: `npm:repo`
  
  Additional locations are in planning for other services, and third party locations can also be [submitted]().
* Version numbers are automatically appended onto the end of the target name based on the [jspm version conventions]().
* Further customizations of package configurations for jspm should be provided in the package.json file
  for a package. If you do not have direct access to the source package, use a package.json override.

Package.json Overrides
---

The registry provides a package.json override system for updating package configuration associated with jspm.

The overrides are located in the `package-overrides` folder of this repo, with the folder format:

`package-overrides/[location-name]/[location-path]@[version].json`

For example, a package override for jquery 2.0.0 would be located at `package-overrides/github/jquery/jquery@2.0.0.json`.

Read more about customizing packages for jspm at the [jspm package.json specification](https://github.com/jspm/registry/wiki/Package.json-Specification) page.
