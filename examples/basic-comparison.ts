/**
 * Example 1: Basic Code Comparison
 * Simple example of comparing two code snippets
 */

import { compareCode } from "../src/plagiarism-detector-ui/services/geminiService";

async function basicComparison() {
  const sourceCode = `
    function calculateSum(numbers: number[]): number {
      let sum = 0;
      for (const num of numbers) {
        sum += num;
      }
      return sum;
    }
  `;

  const suspiciousCode = `
    function getSum(items: number[]): number {
      let total = 0;
      for (const item of items) {
        total += item;
      }
      return total;
    }
  `;

  try {
    const result = await compareCode(sourceCode, suspiciousCode);
    console.log("Comparison Result:");
    console.log(`Similarity: ${result.similarity}%`);
    console.log(`Verdict: ${result.verdict}`);
    console.log(`Methods Used: ${result.methods.map((m) => m.name).join(", ")}`);
  } catch (error) {
    console.error("Error during comparison:", error);
  }
}

// Run the example
// basicComparison();
