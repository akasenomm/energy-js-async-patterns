#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M")
OUTPUT_FILE="results/callback/get/results_callback_get_${TIMESTAMP}.txt"

sudo perf stat -a -e power/energy-psys/ node --expose-gc ../../src/tc1/callback-get.js > "$OUTPUT_FILE" 2>&1
