# API Documentation

## Services

### Gemini Service

#### compareCode(sourceCode: string, suspiciousCode: string)

Compares two code snippets for plagiarism detection.

**Parameters:**
- `sourceCode` (string): Original code to compare against
- `suspiciousCode` (string): Code to check for plagiarism

**Returns:** `Promise<ComparisonResult>`

**Response:**
```typescript
{
  id: string;
  file1: string;
  file2: string;
  similarity: number; // 0-100
  methods: AnalysisMethod[];
  verdict: "PLAGIARISM" | "SUSPECTED" | "CLEAN";
  timestamp: string;
}
```

**Example:**
```typescript
import { compareCode } from './services/geminiService';

const result = await compareCode(sourceCode, suspiciousCode);
console.log(`Similarity: ${result.similarity}%`);
console.log(`Verdict: ${result.verdict}`);
```

---

#### performASTAnalysis(code: string)

Performs Abstract Syntax Tree analysis on code.

**Parameters:**
- `code` (string): Code to analyze

**Returns:** `Promise<string>` - AST analysis report

---

#### calculateSimilarityMetrics(code1: string, code2: string)

Calculates detailed similarity metrics between two code snippets.

**Parameters:**
- `code1` (string): First code snippet
- `code2` (string): Second code snippet

**Returns:** `Promise<SimilarityMetrics>`

**Response:**
```typescript
{
  tokenSimilarity: number;      // 0-100
  structuralSimilarity: number; // 0-100
  semanticSimilarity: number;   // 0-100
  overallScore: number;         // 0-100
}
```

---

#### batchCompareCode(comparisons: Array)

Batch compare multiple code pairs.

**Parameters:**
- `comparisons`: Array of {source, suspicious} objects

**Returns:** `Promise<ComparisonResult[]>`

---

## Types

### ComparisonResult
```typescript
interface ComparisonResult {
  id: string;
  file1: string;
  file2: string;
  similarity: number;
  methods: AnalysisMethod[];
  verdict: PlagiarismVerdict;
  timestamp: string;
}
```

### PlagiarismVerdict
```typescript
type PlagiarismVerdict = "PLAGIARISM" | "SUSPECTED" | "CLEAN";
```

### SimilarityMetrics
```typescript
interface SimilarityMetrics {
  tokenSimilarity: number;
  structuralSimilarity: number;
  semanticSimilarity: number;
  overallScore: number;
}
```

## Error Handling

All service functions throw custom error types:

```typescript
import {
  PlagiarismDetectorError,
  APIError,
  ValidationError,
  AuthenticationError
} from './types/errors';
```

Try-catch blocks recommended for all service calls.
