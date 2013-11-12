JSPM Registry
---

Pull requests welcome. View `registry.json` to see what is currently in the registry.


* The JSPM Registry is the default registryURL for the [JSPM loader](https://github.com/jspm/jspm-loader) located at `https://registry.jspm.io`.

* It simply provides a lookup from a name to a target endpoint:
  ```javascript
    "bootstrap": "github:twbs/bootstrap"
  ```

* The registry provides a mapping from a _unique registry name_ to a _target package_:
  

* For ease of reference, please ensure new names are added in the correct alphabetical location.
* Currently the following SPDY-optimized _location services_ are available in the registry mapping:
  * Github: `github:author/repo`
  * NPM: `npm:repo`
  
  Additional locations are in planning for other services, and third party locations can also be [submitted](https://github.com/jspm/jspm-loader#cdn-locations).
* Version numbers are automatically appended onto the end of the target name based on the [jspm version conventions](https://github.com/jspm/jspm-loader#cdn-locations).
* Further customizations of package configurations for jspm should be provided in the package.json file
  for a package. If you do not have direct access to the source package, use a package.json override.

Package.json Overrides
---

The registry provides a package.json override system for updating package configuration associated with jspm.

The overrides are located in the `package-overrides` folder of this repo, with the folder format:

`package-overrides/[location-name]/[location-path]@[version].json`

For example, a package override for jquery 2.0.0 would be located at `package-overrides/github/jquery/jquery@2.0.0.json`.

Read more about customizing packages for jspm at the [jspm package.json specification](https://github.com/jspm/registry/wiki/Package.json-Specification) page.
