#!/bin/bash
# usage: shot.sh "<query>" out.png   (renders index.html headless)
timeout 60 google-chrome --headless=new --user-data-dir=/tmp/chr$RANDOM$RANDOM --no-sandbox --disable-gpu --hide-scrollbars --window-size=960,540 --enable-logging=stderr --v=0 --virtual-time-budget=800 --screenshot="$2" "file:///workspace/cube-dash/index.html?$1" 2>&1 | grep -E "CONSOLE|Uncaught" | grep -v dbus | sed 's/.*CONSOLE//' | head -5
