#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M")
OUTPUT_FILE="results/promise/post/results_promise_post_${TIMESTAMP}.txt"

sudo perf stat -a -e power/energy-psys/ node --expose-gc ../../src/tc1/promise-post.js > "$OUTPUT_FILE" 2>&1
