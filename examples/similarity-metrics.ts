/**
 * Example 3: Detailed Similarity Metrics
 * Get detailed similarity breakdown between code files
 */

import { calculateSimilarityMetrics } from "../src/plagiarism-detector-ui/services/geminiService";

async function detailedMetrics() {
  const code1 = `
    class DataProcessor {
      process(data: any[]) {
        return data.filter(x => x.valid).map(x => x.value);
      }
    }
  `;

  const code2 = `
    class InfoHandler {
      handle(records: any[]) {
        return records.filter(r => r.valid).map(r => r.value);
      }
    }
  `;

  try {
    const metrics = await calculateSimilarityMetrics(code1, code2);

    console.log("Detailed Similarity Metrics:");
    console.log(`Token Similarity: ${metrics.tokenSimilarity}%`);
    console.log(`Structural Similarity: ${metrics.structuralSimilarity}%`);
    console.log(`Semantic Similarity: ${metrics.semanticSimilarity}%`);
    console.log(`Overall Score: ${metrics.overallScore}%`);

    // Determine verdict based on overall score
    let verdict = "CLEAN";
    if (metrics.overallScore > 75) {
      verdict = "PLAGIARISM";
    } else if (metrics.overallScore > 50) {
      verdict = "SUSPECTED";
    }

    console.log(`\nVerdict: ${verdict}`);
  } catch (error) {
    console.error("Error calculating metrics:", error);
  }
}

// Run the example
// detailedMetrics();
