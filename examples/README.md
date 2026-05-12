# Examples & Use Cases

## Overview

This directory contains practical examples of using the plagiarism detection system.

## Examples

### 1. Basic Comparison
**File:** `basic-comparison.ts`

Simple comparison of two code snippets. Demonstrates:
- Basic API usage
- Error handling
- Result interpretation

### 2. Batch Analysis
**File:** `batch-analysis.ts`

Batch process multiple code comparisons. Demonstrates:
- Handling multiple comparisons
- Statistics collection
- Progress tracking

### 3. Detailed Metrics
**File:** `similarity-metrics.ts`

Get detailed similarity breakdown. Demonstrates:
- Token similarity analysis
- Structural comparison
- Semantic analysis
- Verdict determination

## Running Examples

### Option 1: Direct Execution
```bash
npx ts-node examples/basic-comparison.ts
```

### Option 2: Compiled & Run
```bash
npm run build
node dist/examples/basic-comparison.js
```

### Option 3: In Development
Uncomment the function call at the bottom and run:
```bash
npm run dev
```

## Use Cases

### Academic Integrity
Detect student code plagiarism in assignments:
```typescript
// Compare student submission against previous submissions
const result = await compareCode(previousWork, studentSubmission);
if (result.verdict === "PLAGIARISM") {
  // Flag for review
}
```

### Code Review
Check for unintentional code duplication:
```typescript
// Compare PR code against main branch
const metrics = await calculateSimilarityMetrics(mainCode, prCode);
if (metrics.overallScore > 60) {
  // Request refactoring
}
```

### Security Analysis
Identify copied vulnerable patterns:
```typescript
// Compare against known vulnerable code
const result = await compareCode(vulnerablePattern, userCode);
if (result.similarity > 70) {
  // Security alert
}
```

### Code Reuse Detection
Find similar implementations across projects:
```typescript
// Batch compare code across repositories
const results = await batchCompareCode(codePairs);
// Identify reusable components
```

## Configuration for Examples

Set environment variables before running:
```bash
export GEMINI_API_KEY=your_api_key_here
npm run dev
```

## Extending Examples

To create new examples:

1. Create new TypeScript file in `examples/`
2. Import services and types
3. Write async function
4. Add usage comments
5. Uncomment function call at bottom for testing

## Expected Output

Each example produces:
- Similarity scores
- Verdict (PLAGIARISM/SUSPECTED/CLEAN)
- Method breakdown
- Statistics
