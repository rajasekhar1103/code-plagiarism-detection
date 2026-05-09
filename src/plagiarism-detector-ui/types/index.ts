/**
 * Types for the Plagiarism Detection System
 */

export interface CodeEntry {
  id: string;
  sourceCode: string;
  suspiciousCode: string;
  similarity: number;
  verdict: "Plagiarism Detected" | "Clean" | "Suspected";
  method: string;
  timestamp: string;
  astAnalysis?: string;
}

export interface ComparisonResult {
  id: string;
  file1: string;
  file2: string;
  similarity: number;
  methods: AnalysisMethod[];
  verdict: PlagiarismVerdict;
  timestamp: string;
}

export interface SimilarityMetrics {
  tokenSimilarity: number;
  structuralSimilarity: number;
  semanticSimilarity: number;
  overallScore: number;
}

export interface AnalysisMethod {
  name: string;
  score: number;
  details: string;
}

export interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
}

export type PlagiarismVerdict = "PLAGIARISM" | "SUSPECTED" | "CLEAN";

export interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}
