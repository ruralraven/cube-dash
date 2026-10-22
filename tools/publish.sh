#!/bin/bash
# copy game to the GitHub Pages repo, commit, push, and wait until live ($1 = commit msg, $2 = marker string to wait for, $3 = file to check, default js/game.js)
set -e
cd /workspace/cube-dash
for f in js/*.js; do node --check $f; done
node -e "for(const f of ['engine','levels','music','baked'])require('./js/'+f+'.js')" 
mkdir -p /tmp/cd/js /tmp/cd/tools
cp index.html CHANGELOG.md /tmp/cd/ && sed -i "s/?v=[0-9]*/?v=$(date +%s)/g" /tmp/cd/index.html && cp js/*.js /tmp/cd/js/ && cp tools/*.js tools/*.sh /tmp/cd/tools/
cd /tmp/cd && git add -A && git commit -qm "$1" && git push -q
for i in $(seq 1 40); do curl -sf "https://ruralraven.github.io/cube-dash/${3:-js/game.js}?v=$RANDOM" | grep -qF "$2" && { echo "LIVE after $((i*10))s"; exit 0; }; sleep 10; done; echo "NOT LIVE YET"
