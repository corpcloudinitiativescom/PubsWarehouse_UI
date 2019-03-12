# USGS Publications Warehouse User Interface

[![Build Status](https://travis-ci.org/USGS-CIDA/PubsWarehouse_UI.svg?branch=master)](https://travis-ci.org/USGS-CIDA/PubsWarehouse_UI)
[![Coverage Status](https://coveralls.io/repos/github/USGS-CIDA/PubsWarehouse_UI/badge.svg)](https://coveralls.io/github/USGS-CIDA/PubsWarehouse_UI)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e68775a288dc4077a4672e02110cac22)](https://www.codacy.com/app/usgs_wma_dev/PubsWarehouse_UI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=USGS-CIDA/PubsWarehouse_UI&amp;utm_campaign=Badge_Grade)

The Pubs Warehouse provides access to over 150,000 publications written by USGS
scientists over the century-plus history of the bureau.

This repo contains the front-end components of the Publications Warehouse:

- [`server`](server): A Flask web application that is used to create server-rendered pages
- [`assets`](assets): Client-side Javascript, CSS, images, etc.

This application should be built using Python 3.6 and Node.js version > 8.x.x.

## Install dependencies

The repository contains a make target to configure a local development environment:

```bash
make env
```

To manually configure your environment, please see the READMEs of each separate project.

## Development server

To run all development servers in a watch mode at the same time, use the make target:

```bash
make watch
```

... and to run each dev server individually:

```bash
make watch-server
make watch-assets
```

See the specific project READMEs for additional information.

- [Flask Server README](./server/README.md)
- [Assets README](./assets/README.md)

## Run tests

To run all project tests:

```bash
make test
```

## Production build

```bash
make build
```

## Clean targets

```bash
make clean      ; clean build artifacts
make cleanenv   ; clean environment configuration and build artifacts
```

`make` supports chaining targets, so you could also `make clean watch`, etc.
