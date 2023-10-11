SERVICE_NAME:=templaniantiger

build: microfrontend-build

microfrontend-install:
	cd service/microfrontend && yarn install

microfrontend-build: microfrontend-install
	cd service/microfrontend && yarn build

microfrontend-test: microfrontend-install
	cd service/microfrontend && yarn test

microfrontend-start: microfrontend-install
	cd service/microfrontend && yarn start

microfrontend-build-storybook: microfrontend-install
	cd service/microfrontend && yarn build-storybook

microfrontend-chromatic: microfrontend-install
	cd service/microfrontend && yarn chromatic --exit-zero-on-changes

microfrontend-chromatic-auto-accept: microfrontend-install
	cd service/microfrontend && yarn chromatic --auto-accept-changes

microfrontend-wrapper-publish:
	@test -n "$(VERSION)" || (echo "Error: VERSION must be set."; exit 1)
	cd service/microfrontend-wrapper && yarn install && yarn build
	cd service/microfrontend-wrapper && yarn publish --new-version ${VERSION} --no-git-tag-version
	cd service/microfrontend-wrapper && yarn version --new-version 0.1.0 --no-git-tag-version

graphql-validate-client:
	cd service/microfrontend && find src -type f -exec sed -i 's/gql(`/gql`/' {} + # Otherwise apollo cli will not find our queries and mutations
	cd service/microfrontend && apollo client:check --clientName=$(SERVICE_NAME)-microfrontend --includes="src/**/*" --variant=$(SCHEMA_TAG)

graphql-validate-client-staging:
	$(MAKE) graphql-validate-client SCHEMA_TAG=staging

graphql-validate-client-prod:
	$(MAKE) graphql-validate-client SCHEMA_TAG=prod-eu

microfrontend-upload:
	@test -n "$(ENVIRONMENT)" || (echo "Error: ENVIRONMENT must be set."; exit 1)
	@test -n "$(TAG)" || (echo "Error: TAG must be set."; exit 1)
	aws s3 cp service/microfrontend/build/ s3://mp-$(ENVIRONMENT)-microfrontends/$(SERVICE_NAME)/$(TAG)/ --recursive

microfrontend-download:
	@test -n "$(ENVIRONMENT)" || (echo "Error: ENVIRONMENT must be set."; exit 1)
	@test -n "$(TAG)" || (echo "Error: TAG must be set."; exit 1)
	aws s3 cp s3://mp-$(ENVIRONMENT)-microfrontends/$(SERVICE_NAME)/$(TAG)/ service/microfrontend/build/ --recursive

microfrontend-deploy:
	@test -n "$(ENVIRONMENT)" || (echo "Error: ENVIRONMENT must be set."; exit 1)
	@test -n "$(TAG)" || (echo "Error: TAG must be set."; exit 1)
	jq '.currentVersion = "$(TAG)"' microfrontend.json > $(SERVICE_NAME).json
	aws s3 cp $(SERVICE_NAME).json s3://mp-$(ENVIRONMENT)-microfrontends/$(SERVICE_NAME).json
