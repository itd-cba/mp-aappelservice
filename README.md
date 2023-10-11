# TemplanianTiger

This repository contains a template to create new microfrontends with reduced effort.

## Support from Team Platform

If you're planning to create a new microservice, please contact Team Platform. They should be on-board from the beginning.

Directly after you've created the new service repository you need to complete a list of tasks that bring your service into a state where it can be deployed
the first time to staging & production. Therefore you'll also need support from Team Platform.

### Example for planning the service creation

To ensure an as frictionless as possible implementation it is recommended to plan everything this matching tasks in Jira that are assigned to the right team
and have "blocked by" relations in between.

> **[Epic] Unicorn Feature _(My Team)_**
>
> - Sprint 1
>   - [Story] Build new Service _(My Team)_
>   - [Chore] Support for build & first Prod-Deploy **_(Platform)_**
> - Sprint 2 bis (n-1)
>   - [Story] Feature Awesome _(My Team)_
>   - [Story] Feature Incredible _(My Team)_
>   - [Story] ...
> - Sprint n
>   - [Story] Preparation for Beta/Public-Release _(My Team)_
>   - [Chore] Service-Review for Beta/Public-Release **_(Platform)_**
> - Sprint n+1
>   - [Story] Beta/Public-Release _(My Team)_

The stories for Team Platform need to be planned, please contact our product owner (TPE).

## Setup the Repository (Sprint 1)

### Create a new repository

In the [matching Runbook](https://itdesign-de.atlassian.net/wiki/spaces/PLATFORM/pages/23536904996/GitHub+Neues+Repository+erzeugen) are all steps described that need to be done.

### Replace placeholder

- Search in all folders for `templaniantiger` and replace it accordingly.
    - `git grep templaniantiger` will list all files that contain the service name
    - `git ls-files | grep templaniantiger` will list all file names or folders that contain the service name
- The service does need a new port
    - Go to [meisterplan.in/ports](https://meisterplan.in/ports) and search for the next block of free ports (10 ports per service)
    - `git grep "8780"` will find all places where the port is referenced
- Insert your team name
    - With `git grep team-platform` you'll find all locations where your team name need to be replaced.
- The `project-token` for Chromatic must be replaced at `service/microfrontend/package.json`
- THe `appId` must be replaced here: `service.spec.template.yml`

### Create a `service.spec.yml`

- Use the `service.spec.template.yml` as a template and insert all required information.
- Rename the file to `service.spec.yml`.

### Add a `deploy/prod/latest` tag

DeployDuck always compares your code to the `deploy/prod/latest` tag, so this tag must be present.

- Create the tag for the first commit: `git tag -a deploy/prod/latest $(git rev-list --max-parents=0 HEAD | tail -n 1)`
- Push the tag: `git push origin deploy/prod/latest`

### Register the service in internal our tooling
- Add it to the repository list of the [DeployDuck](https://github.com/itdesign-gmbh/mp-deployduck/blob/master/service/server/src/main/kotlin/com/meisterplan/deployduck/domain/model/Repository.kt)

### Replace the README file

Now write a useful README file. You can use `README.template.md` as a template. Write down details & knowledge required to start developing the service.

## Build & first Prod-Deploy of the Services (Sprint 1)

Team Platform will support you bringing the service into shape, so it is ready to be deployed to production. Adding it to the on premise package is also an
option.

There is a runbook that Team Platform will use to deploy your service to staging and production. You can take a look in advance to get familiar with the
process.

[Runbook: Erster Build & Prod-Deploy eines neuen Services](https://itdesign-de.atlassian.net/l/c/qUSaXU2U)

## Beta/Public-Release of the Service (Sprint n)

Before releasing the service to the public (or a limited amount of beta customers) it is required to check, together with Team Platform, if the service is
ready to be used in production. Team Platform will check with you if all common rules and best practices are implemented in your service.

You can check in advance the runbook, to get familiar with the process.

[Runbook: Erstes Beta/Public-Release eines neuen Services](https://itdesign-de.atlassian.net/l/c/vWrayWoT)

Implemented with ❤️ by awesome Meisterplan Developers!
You all build great Software!
