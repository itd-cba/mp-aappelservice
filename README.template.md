# TemplanianTiger

<img src="https://static.meisterplan.com/web/images/service-logos/templaniantiger.png" width="250px">

## Development

The microfrontend uses the library Microfrontends. More details about the library can be found in
the [Documentation of Microfrontends](https://github.com/itdesign-gmbh/mp-microfrontend/blob/master/README.md).

### Enable pre-commit hooks

Simply call `yarn install` on the repository root to initialize Husky which is running pre-commit checks defined in `.husky/pre-commit`. This hook validates the
frontend tests. It runs a static code analysis and checks the code format in all projects.
