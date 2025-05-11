#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M")
OUTPUT_FILE="results/asyncawait/post/results_asyncawait_post_${TIMESTAMP}.txt"

sudo perf stat -a -e power/energy-psys/ node --expose-gc ../../src/tc1/asyncawait-post.js > "$OUTPUT_FILE" 2>&1
