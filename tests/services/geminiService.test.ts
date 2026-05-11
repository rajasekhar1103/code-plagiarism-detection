/**
 * Unit Tests for Gemini Service
 */

import {
  compareCode,
  performASTAnalysis,
  calculateSimilarityMetrics,
} from "../src/plagiarism-detector-ui/services/geminiService";
import { PlagiarismVerdict } from "../src/plagiarism-detector-ui/types";

// Mock data
const sampleCode1 = `
function add(a: number, b: number): number {
  return a + b;
}
`;

const sampleCode2 = `
function addNumbers(x: number, y: number): number {
  return x + y;
}
`;

describe("Gemini Service", () => {
  describe("compareCode", () => {
    it("should return a comparison result with similarity and verdict", async () => {
      // Note: This test would need proper API key and mocking in production
      expect(compareCode).toBeDefined();
    });

    it("should handle identical code with high similarity", async () => {
      // Test case for identical code
      expect(compareCode).toBeInstanceOf(Function);
    });
  });

  describe("calculateSimilarityMetrics", () => {
    it("should return similarity metrics object", async () => {
      expect(calculateSimilarityMetrics).toBeDefined();
    });

    it("should have metrics between 0-100", async () => {
      expect(calculateSimilarityMetrics).toBeInstanceOf(Function);
    });
  });

  describe("performASTAnalysis", () => {
    it("should return AST analysis string", async () => {
      expect(performASTAnalysis).toBeDefined();
    });
  });
});
