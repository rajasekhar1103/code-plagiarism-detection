/**
 * Example 2: Batch Code Analysis
 * Compare multiple code files in batch
 */

import { batchCompareCode } from "../src/plagiarism-detector-ui/services/geminiService";

async function batchAnalysis() {
  const codePairs = [
    {
      source: `function add(a, b) { return a + b; }`,
      suspicious: `function sum(x, y) { return x + y; }`,
    },
    {
      source: `const multiply = (a, b) => a * b;`,
      suspicious: `const product = (x, y) => x * y;`,
    },
    {
      source: `function sort(arr) { return arr.sort(); }`,
      suspicious: `function orderArray(items) { return items.sort(); }`,
    },
  ];

  try {
    const results = await batchCompareCode(codePairs);
    
    console.log("Batch Analysis Results:");
    results.forEach((result, index) => {
      console.log(`\nComparison ${index + 1}:`);
      console.log(`  Similarity: ${result.similarity}%`);
      console.log(`  Verdict: ${result.verdict}`);
    });

    // Statistics
    const plagiarismCount = results.filter(
      (r) => r.verdict === "PLAGIARISM"
    ).length;
    const cleanCount = results.filter((r) => r.verdict === "CLEAN").length;
    const suspectedCount = results.filter(
      (r) => r.verdict === "SUSPECTED"
    ).length;

    console.log("\nStatistics:");
    console.log(`  Total: ${results.length}`);
    console.log(`  Plagiarism: ${plagiarismCount}`);
    console.log(`  Clean: ${cleanCount}`);
    console.log(`  Suspected: ${suspectedCount}`);
  } catch (error) {
    console.error("Error during batch analysis:", error);
  }
}

// Run the example
// batchAnalysis();
