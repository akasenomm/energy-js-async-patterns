# JavaScript Asynchronous Patterns Energy Efficiency

This repository contains the source code used in the thesis "Energy Matters: Evaluating JavaScript Asynchronous Patterns for Green Development" by Artur Kasenõmm at the University of Tartu. The thesis investigates the energy consumption differences between JavaScript's three primary asynchronous patterns: callback, promise, async/await.
The goal is to provide data on whether choosing different asynchronous patterns can lead to energy savings in JavaScript applications, contributing to more environmentally friendly software development practices.

```
npm install
```

Start the server
```
node server.js > server.log 2>&1
```
Test Case 1:
```
cd scripts/uc1
./run_callback_get.sh
./run_promise_get.sh
./run_asyncawait_get.sh

./run_callback_post.sh
./run_promise_post.sh
./run_asyncawait_post.sh

./extract_uc1_results.sh
```

Test Case 2:
```
cd scripts/uc2
./run_callback.sh
./run_promise.sh
./run_asyncawait.sh

./extract_uc2_results.sh
```

The result files are saved to the `scripts/tc1/results` directory for Test Case 1 and the `scripts/tc2/results` directory for Test Case 2.

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
