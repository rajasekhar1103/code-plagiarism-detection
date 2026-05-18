<div align="center">

# Code Plagiarism Detection

**Advanced code plagiarism detection powered by Google Generative AI**

[![Tests](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/test.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/test.yml)
[![Lint](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/lint.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/lint.yml)
[![Build](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/build.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/build.yml)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Usage Examples](#usage-examples)
- [Architecture](#architecture)
- [API](#api)
- [Docker](#docker)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

A React-based web application that uses Google's Generative AI to detect code plagiarism via AST analysis, token similarity, structural comparison, and semantic analysis.

**Key Capabilities:**
- Real-time code comparison and analysis
- AI-powered insights using Google Gemini
- Visual dashboards and analytics
- Batch processing for multiple files

---

## Features

- **Multi-Method Detection** — AST analysis, token similarity, structural analysis, semantic AI comparison
- **Real-Time Analysis** — Instant results with detailed verdicts
- **Visual Analytics** — Interactive charts, statistics dashboard, similarity heatmaps
- **Batch Processing** — Compare multiple file pairs with rate limiting and progress tracking
- **Report Generation** — Detailed analysis with risk assessment and confidence scores
- **Code Navigation** — Side-by-side comparison with syntax highlighting

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS |
| **Visualization** | Recharts 3.7, Lucide React |
| **AI Engine** | Google Generative AI SDK 1.38 |
| **Testing** | Jest, Vitest |
| **Quality** | ESLint, Prettier, Husky |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x+
- Google Gemini API Key ([get one here](https://makersuite.google.com/app/apikey))

### Setup

```bash
# Clone and install
git clone https://github.com/rajasekhar1103/code-plagiarism-detection.git
cd code-plagiarism-detection
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and set GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here          # Required
VITE_API_TIMEOUT=30000                     # Request timeout in ms
VITE_MAX_RETRIES=3                         # Retry attempts
VITE_ENABLE_CACHING=true                   # Enable result caching
VITE_ENABLE_BATCH_MODE=false               # Enable batch processing
VITE_DEBUG_MODE=false                      # Debug logging
VITE_THEME=auto                            # auto|light|dark
VITE_LANGUAGE=en                           # en|es|fr|de
```

### Vite Configuration

- Port: 3000, Host: 0.0.0.0
- Env vars passed as `import.meta.env`

### TypeScript Configuration

- Target: ES2022, Module: ESNext
- Strict mode enabled

---

## Project Structure

```
src/plagiarism-detector-ui/
├── components/
│   ├── common/          # Button, Card, Badge, Modal
│   ├── charts/          # SimilarityChart, StatisticsPanel
│   ├── App.tsx          # Main component
│   └── Dashboard.tsx
├── services/
│   ├── geminiService.ts # Google Generative AI integration
│   └── index.ts
├── types/
│   ├── index.ts         # Core types
│   ├── api.ts           # API response types
│   ├── errors.ts        # Error types
│   └── utils.ts         # Utility types
├── tests/
│   ├── services/
│   ├── utils/
│   └── setup.ts
├── examples/
├── docs/
└── .github/workflows/
```

---

## Scripts

### Development
```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build
```

### Testing & Quality
```bash
npm run test             # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run lint             # Run ESLint
npm run lint:fix         # Fix lint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
```

---

## Usage Examples

### Basic Code Comparison

```typescript
import { compareCode } from './services/geminiService';

const result = await compareCode(sourceCode, suspiciousCode);
console.log(`Similarity: ${result.similarity}%`);
console.log(`Verdict: ${result.verdict}`);
```

### Batch Comparison

```typescript
import { batchCompareCode } from './services/geminiService';

const results = await batchCompareCode([
  { source: '...', suspicious: '...' },
  // ... more comparisons
]);
```

### Detailed Metrics

```typescript
import { calculateSimilarityMetrics } from './services/geminiService';

const metrics = await calculateSimilarityMetrics(code1, code2);
console.log({
  tokenSimilarity: metrics.tokenSimilarity,
  structuralSimilarity: metrics.structuralSimilarity,
  semanticSimilarity: metrics.semanticSimilarity,
  overallScore: metrics.overallScore
});
```

More examples in [examples/README.md](examples/README.md).

---

## Architecture

```
┌──────────────────────────┐
│   React UI Components     │  User Interface
├──────────────────────────┤
│   Custom React Hooks      │  State Management
├──────────────────────────┤
│   Service Layer           │  Business Logic
│   (Gemini API Integration)│
├──────────────────────────┤
│   Type Definitions        │  Type Safety
├──────────────────────────┤
│   External APIs           │  Integration Layer
└──────────────────────────┘
```

### Detection Methods
- **Token Analysis** — Compares individual code tokens
- **Structural Analysis** — Analyzes AST structure similarity
- **Semantic Analysis** — Compares code semantics via AI
- **Pattern Matching** — Identifies common code patterns

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.

---

## API

### `compareCode(sourceCode, suspiciousCode)`

Compares two code snippets for plagiarism.

| Parameter | Type | Description |
|---|---|---|
| `sourceCode` | string | Original code |
| `suspiciousCode` | string | Code to check |

Returns `Promise<ComparisonResult>`:
```typescript
{
  id: string;
  file1: string;
  file2: string;
  similarity: number;        // 0-100
  methods: AnalysisMethod[];
  verdict: "PLAGIARISM" | "SUSPECTED" | "CLEAN";
  timestamp: string;
}
```

### `calculateSimilarityMetrics(code1, code2)`

Returns detailed similarity metrics.

### `batchCompareCode(comparisons)`

Compares multiple code pairs in batch.

Full API docs at [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

---

## Docker

### Development
```bash
docker-compose up dev
```

### Production
```bash
docker build -f Dockerfile.prod -t plagiarism-detector:latest .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key plagiarism-detector:latest

# Or use compose
docker-compose -f docker-compose.prod.yml up
```

---

## Testing

```bash
npm run test                        # Run all tests
npm run test -- geminiService.test.ts  # Single file
npm run test:coverage               # With coverage
```

### Coverage Goals
- Statements: 80%+ | Branches: 70%+ | Functions: 80%+ | Lines: 80%+

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes following code standards
4. Add tests for new functionality
5. Run `npm run test && npm run lint`
6. Commit: `git commit -m "feat: description"`
7. Push and create a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## License

MIT License — see [LICENSE](LICENSE) file.

---

<div align="center">

**If you find this project helpful, please give it a star!**

[Back to top](#code-plagiarism-detection)

</div>
