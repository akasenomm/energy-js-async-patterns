#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M")
OUTPUT_FILE="results/asyncawait/results_asyncawait_${TIMESTAMP}.txt"

sudo perf stat -a -e power/energy-psys/ node --expose-gc ../../src/tc2/asyncawait.js > "$OUTPUT_FILE" 2>&1
