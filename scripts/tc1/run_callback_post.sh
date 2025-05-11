#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M")
OUTPUT_FILE="results/callback/post/results_callback_post_${TIMESTAMP}.txt"

sudo perf stat -a -e power/energy-psys/ node --expose-gc ../../src/tc1/callback-post.js > "$OUTPUT_FILE" 2>&1
