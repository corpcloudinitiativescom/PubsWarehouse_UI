#!/usr/bin/env bash

export project_name=$(basename $(git remote show -n origin | grep Fetch | cut -d: -f2-))

docker-compose -f docker-compose.yml -p $project_name down