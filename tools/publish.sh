#!/bin/bash
# copy game to the GitHub Pages repo, commit, push, and wait until live ($1 = commit msg, $2 = marker string to wait for, $3 = file to check, default js/game.js)
set -euo pipefail
trap 'echo "PUBLISH FAILED at line $LINENO: $BASH_COMMAND" >&2' ERR
[ -d /tmp/cd/.git ] || { echo 'PUBLISH FAILED: /tmp/cd is not a git repo (re-clone: gh repo clone ruralraven/cube-dash /tmp/cd)' >&2; exit 1; }
cd /workspace/cube-dash
for f in js/*.js; do node --check $f; done
V=$(grep -o "CD_VERSION='v[0-9.]*'" js/extras.js | grep -o 'v[0-9.]*'); C=$(grep -m1 -o '^## v[0-9.]*' CHANGELOG.md | grep -o 'v[0-9.]*')
[ "$V" = "$C" ] || { echo "PUBLISH FAILED: version mismatch (js/extras.js $V vs CHANGELOG $C)" >&2; exit 1; }
node -e "for(const f of ['engine','levels','music','baked'])require('./js/'+f+'.js')" 
mkdir -p /tmp/cd/js /tmp/cd/tools
cp index.html CHANGELOG.md .nojekyll /tmp/cd/ && sed -i "s/?v=[0-9]*/?v=$(date +%s)/g" /tmp/cd/index.html && cp js/*.js /tmp/cd/js/ && cp tools/*.js tools/*.sh /tmp/cd/tools/
cp manifest.webmanifest /tmp/cd/ && mkdir -p /tmp/cd/icons && cp icons/*.png /tmp/cd/icons/
cd /tmp/cd
git add -A
git commit -qm "$1"
git push -q
for i in $(seq 1 40); do curl -sf "https://ruralraven.github.io/cube-dash/${3:-js/game.js}?v=$RANDOM" | grep -F "$2" >/dev/null && { echo "LIVE after $((i*10))s"; exit 0; }; sleep 10; done; echo "NOT LIVE YET"; exit 1
