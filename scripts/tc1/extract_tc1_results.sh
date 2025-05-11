#!/bin/bash
RESULTS_DIR="./results"
PATTERNS="callback promise asyncawait"
METHODS="get post"

for pattern in $PATTERNS; do
  pattern_dir="$RESULTS_DIR/$pattern"

  for method in $METHODS; do
    method_dir="$pattern_dir/$method"
    output_file="$RESULTS_DIR/${pattern}_${method}_tc1_results.csv"

    echo "FILE,ENERGY_JOULES,TIME_SECONDS" > "$output_file"

    echo "Processing $pattern/$method pattern..."

    for file in "$method_dir"/*; do
      filename=$(basename "$file")

      energy=$(grep -o "[0-9]\+\.[0-9]\+ Joules" "$file" | awk '{print $1}')

      time=$(grep -o "[0-9]\+\.[0-9]\+ seconds" "$file" | awk '{print $1}')

      echo "$filename,$energy,$time" >> "$output_file"
    done

    echo "Results for $pattern/$method written to $output_file"
  done
done

echo "All processing complete"