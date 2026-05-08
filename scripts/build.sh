#!/bin/bash
# Build script for plagiarism-detector-ui module

set -e

echo "Building plagiarism-detector-ui module..."
npm install
npm run build

echo "Build completed successfully!"
