#!/usr/bin/env bash

set -ex 

source ./build.sh
export project_name=$(basename $(git remote show -n origin | grep Fetch | cut -d: -f2-))

docker-compose -f docker-compose.yml -p $project_name up 
#-d
docker-compose -p $project_name ps
echo "---------------------------------------------------------------------------------------------------------"
echo ""
echo "URL: http://localhost:5050"
echo ""
echo "---------------------------------------------------------------------------------------------------------"
echo "To stop the application run ./cleanup.sh"
echo ""

