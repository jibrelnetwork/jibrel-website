#!/bin/sh -e

RUNMODE="${1:-start}"

if [ "${RUNMODE}" = "check" ]; then
    /usr/sbin/nginx -t
else
    echo "Starting jibrel-website service, version: `cat /app/version.txt` on node `hostname`"
    /usr/sbin/nginx
fi
