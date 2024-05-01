#!/usr/bin/env bash

echo "Starting creating nginx conf file"

envsubst < /etc/nginx/my-site.conf.template > /etc/nginx/nginx.conf

echo "Start nginx"
nginx -g "daemon off;"