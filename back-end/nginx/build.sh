#!/usr/bin/env bash

# Remove Old Image
docker rm -f vehicle-insurance_nginx

# No Cache Build
docker build --no-cache -t vehicle-insurance_nginx -f docker/nginx/Dockerfile .

# Cache Build
#docker build -t vehicle-insurance_nginx -f docker/nginx/Dockerfile .