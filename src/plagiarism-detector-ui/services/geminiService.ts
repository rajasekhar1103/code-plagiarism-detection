/**
 * Gemini API Service
 * Handles communication with Google Generative AI API for plagiarism detection
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult, SimilarityMetrics, PlagiarismVerdict } from "../types/index";

/**
 * Initialize Google Generative AI client
 */
const genAI = new GoogleGenAI({
  apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "",
});

/**
 * Get the generative model instance
 */
const getModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
};

/**
 * Compare two code snippets for plagiarism
 * @param sourceCode - The original code
 * @param suspiciousCode - The code to check for plagiarism
 * @returns ComparisonResult with similarity metrics and verdict
 */
export async function compareCode(
  sourceCode: string,
  suspiciousCode: string
): Promise<ComparisonResult> {
  try {
    const model = getModel();

    const prompt = `
Analyze these two code snippets for plagiarism and similarity:

SOURCE CODE:
\`\`\`
${sourceCode}
\`\`\`

SUSPICIOUS CODE:
\`\`\`
${suspiciousCode}
\`\`\`

Provide a JSON response with:
1. similarity (0-100): Overall similarity percentage
2. verdict: "PLAGIARISM" | "SUSPECTED" | "CLEAN"
3. methods: Array of analysis methods used with scores
4. explanation: Detailed analysis

Response format:
{
  "similarity": <number>,
  "verdict": "<string>",
  "methods": [{"name": "<string>", "score": <number>}],
  "explanation": "<string>"
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid API response format");
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    return {
      id: generateId(),
      file1: "source",
      file2: "suspicious",
      similarity: analysisResult.similarity,
      methods: analysisResult.methods || [],
      verdict: analysisResult.verdict as PlagiarismVerdict,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error comparing code:", error);
    throw error;
  }
}

/**
 * Perform AST analysis on code
 * @param code - The code to analyze
 * @returns AST analysis results
 */
export async function performASTAnalysis(code: string): Promise<string> {
  try {
    const model = getModel();

    const prompt = `
Analyze the Abstract Syntax Tree (AST) of this code:

\`\`\`
${code}
\`\`\`

Provide:
1. AST structure (in tree format)
2. Key nodes and their types
3. Function signatures
4. Variable declarations
5. Control flow patterns

Format your response as a structured analysis.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error performing AST analysis:", error);
    throw error;
  }
}

/**
 * Calculate similarity metrics between two code snippets
 * @param code1 - First code snippet
 * @param code2 - Second code snippet
 * @returns SimilarityMetrics object
 */
export async function calculateSimilarityMetrics(
  code1: string,
  code2: string
): Promise<SimilarityMetrics> {
  try {
    const model = getModel();

    const prompt = `
Compare these two code snippets and provide similarity metrics:

CODE 1:
\`\`\`
${code1}
\`\`\`

CODE 2:
\`\`\`
${code2}
\`\`\`

Return a JSON object with these metrics (0-100):
{
  "tokenSimilarity": <number>,
  "structuralSimilarity": <number>,
  "semanticSimilarity": <number>,
  "overallScore": <number>
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid metrics response format");
    }

    return JSON.parse(jsonMatch[0]) as SimilarityMetrics;
  } catch (error) {
    console.error("Error calculating similarity metrics:", error);
    throw error;
  }
}

/**
 * Batch compare multiple code files
 * @param comparisons - Array of code pair comparisons
 * @returns Array of comparison results
 */
export async function batchCompareCode(
  comparisons: Array<{ source: string; suspicious: string }>
): Promise<ComparisonResult[]> {
  try {
    const results: ComparisonResult[] = [];

    for (const comparison of comparisons) {
      const result = await compareCode(comparison.source, comparison.suspicious);
      results.push(result);
      
      // Add delay between API calls to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return results;
  } catch (error) {
    console.error("Error in batch comparison:", error);
    throw error;
  }
}

/**
 * Generate plagiarism report
 * @param results - Array of comparison results
 * @returns Formatted plagiarism report
 */
export async function generateReport(
  results: ComparisonResult[]
): Promise<string> {
  try {
    const model = getModel();

    const resultsSummary = results
      .map(
        (r) =>
          `- File Comparison: ${r.file1} vs ${r.file2}
         Similarity: ${r.similarity}%
         Verdict: ${r.verdict}
         Methods Used: ${r.methods.map((m) => m.name).join(", ")}`
      )
      .join("\n");

    const prompt = `
Generate a professional plagiarism detection report based on these analysis results:

${resultsSummary}

Include:
1. Executive Summary
2. Detailed Findings
3. Risk Assessment
4. Recommendations
5. Confidence Scores
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}

/**
 * Utility function to generate unique ID
 */
function generateId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Export service object
 */
export default {
  compareCode,
  performASTAnalysis,
  calculateSimilarityMetrics,
  batchCompareCode,
  generateReport,
};
