#!/bin/bash
RESULTS_DIR="./results"
PATTERNS="callback promise asyncawait"
for pattern in $PATTERNS; do
  pattern_dir="$RESULTS_DIR/$pattern"
  output_file="$RESULTS_DIR/${pattern}_tc2_results.csv"
  echo "FILE,ENERGY_JOULES,TIME_SECONDS" > "$output_file"
  echo "Processing $pattern pattern..."
  for file in "$pattern_dir"/*; do
    filename=$(basename "$file")
    energy=$(grep -o "[0-9]\+\.[0-9]\+ Joules" "$file" | awk '{print $1}')
    time=$(grep -o "[0-9]\+\.[0-9]\+ seconds" "$file" | awk '{print $1}')
    echo "$filename,$energy,$time" >> "$output_file"
  done
  echo "Results for $pattern written to $output_file"
done
echo "All processing complete"
