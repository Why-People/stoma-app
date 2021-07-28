#!/bin/sh
echo Starting Redis
npm run serve & gnome-terminal "redis-server"