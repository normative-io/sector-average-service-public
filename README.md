<!--
 Copyright 2022 Meta Mind AB

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# Sector Average Service

A service to query industries emissions in different regions based on the revenue.
The service is connected to an optimized version of Exiobase database.

**Note:** The version 3 of Exiobase is used.

## Installation

```bash
$ npm install
```

## Prerequisites for running locally

make sure you have a `local` dir on the root of project where you keep your local .env files for different stages. e.g: local, dev, prod.
run `make [loc, dev, prod]` to copy the right env file to the `.env` file on the root of the project. this file is required for the project to start.

## Running in container

this project is part of public profile infrastructure and can start along with other services in a docker environment.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Open API interface

Swagger tool is used to serve OpenApi specifications
Go to http://localhost:3003/api/sector/openapi to see the Swagger API exploration UI.

## Contributing

This project is maintained by Normative but currently not actively seeking external contributions. If you however are interested in contributing to the project please [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSe80c9nrHlAq6w2vUbeFSPVGG7IPqorKMkizhHJ98viwnT-OA/viewform?usp=sf_link) or come [join us](https://normative.io/jobs/).

Thank you to all the people from Google.org who were critical in making this project a reality!
- John Bartholomew ([@johnbartholomew](https://github.com/johnbartholomew))

## License
Copyright (c) Meta Mind AB. All rights reserved.

Licensed under the [Apache-2.0 license](/LICENSE)
