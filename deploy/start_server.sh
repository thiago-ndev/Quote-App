#!/usr/bin/env bash
# start-server.sh
(/home/ubuntu/Structures-Quote-App/venv/bin/gunicorn Structures_Project.wsgi --user www-data --bind 0.0.0.0:8010 --workers 1 --timeout 600) &
nginx -g "daemon off;"