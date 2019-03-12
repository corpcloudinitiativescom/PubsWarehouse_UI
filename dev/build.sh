#!/usr/bin/env bash

set -ex

image_name=usgs_ui

docker build -t $image_name  ../build
docker image ls | grep $image_name