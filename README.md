<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Code Plagiarism Detection - AI Studio Application

**Advanced code plagiarism detection powered by Google Generative AI**

[![Tests](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/test.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/test.yml)
[![Lint](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/lint.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/lint.yml)
[![Build](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/build.yml/badge.svg)](https://github.com/rajasekhar1103/code-plagiarism-detection/actions/workflows/build.yml)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Usage Examples](#usage-examples)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Overview

The **Code Plagiarism Detection UI** is a modern React-based web application that leverages Google's Generative AI API to detect and analyze code plagiarism. It provides comprehensive analysis using multiple detection methods including AST analysis, token similarity, structural comparison, and semantic analysis.

This application is built as part of the code-plagiarism-detection project and serves as the frontend for the plagiarism detection system.

**Key Capabilities:**
- Real-time code comparison and analysis
- Multiple plagiarism detection algorithms
- AI-powered insights using Google Gemini
- Visual dashboards and analytics
- Batch processing for multiple files
- Responsive design with dark mode support

---

## ✨ Features

### Core Features
- **Multi-Method Detection**
  - AST (Abstract Syntax Tree) Analysis
  - Token-based similarity comparison
  - Structural code analysis
  - Semantic comparison using AI

- **Real-Time Analysis**
  - Instant code comparison results
  - Live similarity metrics
  - Detailed verdict generation

- **Visual Analytics**
  - Interactive charts and graphs
  - Statistics dashboard
  - Similarity heatmaps
  - Method breakdown visualization

- **User Experience**
  - Modern, intuitive interface
  - Dark mode support
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Loading states and feedback

### Advanced Features
- **Batch Processing**
  - Compare multiple file pairs simultaneously
  - Rate-limited API calls
  - Progress tracking
  - Result aggregation

- **Report Generation**
  - Detailed analysis reports
  - Risk assessment
  - Confidence scores
  - Export functionality

- **Code Navigation**
  - Side-by-side code comparison
  - Syntax highlighting
  - Line-by-line analysis
  - Semantic highlighting

---

## 🛠 Tech Stack

### Frontend
- **React** `19.2.4` - UI library
- **TypeScript** `5.8.2` - Type-safe development
- **Vite** `6.2.0` - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework

### UI Components & Visualization
- **Lucide React** `0.563.0` - Icon library
- **Recharts** `3.7.0` - React charting library
- **Heroicons** - Premium icon set (optional)

### Backend Integration
- **Google Generative AI SDK** `1.38.0` - AI analysis engine
- **Axios** - HTTP client (for potential API calls)

### Development & Testing
- **Jest** - Unit testing framework
- **Vitest** - Fast unit test framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipelines

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** `18.x` or `20.x`
- **npm** `9.x` or higher
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### 1-Minute Setup

```bash
# Clone the repository
git clone https://github.com/rajasekhar1103/code-plagiarism-detection.git
cd code-plagiarism-detection

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Gemini API key
# Edit .env.local and set GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📦 Installation

### Step 1: Clone Repository
```bash
git clone https://github.com/rajasekhar1103/code-plagiarism-detection.git
cd code-plagiarism-detection
```

### Step 2: Install Dependencies
```bash
npm install
```

Installs all required packages:
- React and dependencies
- Build tools (Vite)
- Testing frameworks
- Linting tools
- Google Generative AI SDK

### Step 3: Environment Setup
```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

### Step 4: Verify Installation
```bash
# Run tests to ensure everything is setup correctly
npm run test

# Check for any linting issues
npm run lint
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required: Google Generative AI API Key
GEMINI_API_KEY=your_api_key_here

# Optional: API Configuration
VITE_API_TIMEOUT=30000          # Request timeout in ms
VITE_MAX_RETRIES=3              # Number of retry attempts

# Optional: Feature Flags
VITE_ENABLE_CACHING=true        # Enable result caching
VITE_ENABLE_BATCH_MODE=false    # Enable batch processing
VITE_DEBUG_MODE=false           # Enable debug logging

# Optional: UI Configuration
VITE_THEME=auto                 # auto|light|dark
VITE_LANGUAGE=en                # en|es|fr|de
```

### Vite Configuration

The project uses Vite with React plugin. Key configuration in `vite.config.ts`:

```typescript
- Port: 3000
- Host: 0.0.0.0 (accessible from network)
- Environment variables: Passed as process.env
- Path aliases: @ points to root directory
```

### TypeScript Configuration

TypeScript settings in `tsconfig.json`:

```typescript
- Target: ES2022
- Module: ESNext
- Strict mode: enabled
- JSX: React 18+ (automatic)
```

---

## 📂 Project Structure

```
project-root/
│
├── src/
│   └── plagiarism-detector-ui/
│       ├── components/
│       │   ├── common/              # Reusable UI components
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Badge.tsx
│       │   │   ├── Modal.tsx
│       │   │   └── index.ts
│       │   ├── charts/              # Data visualization
│       │   │   ├── SimilarityChart.tsx
│       │   │   ├── StatisticsPanel.tsx
│       │   │   └── index.ts
│       │   ├── App.tsx              # Main application component
│       │   └── Dashboard.tsx        # Dashboard component
│       │
│       ├── services/
│       │   ├── geminiService.ts     # Google Generative AI integration
│       │   └── index.ts
│       │
│       ├── types/
│       │   ├── index.ts             # Core types
│       │   ├── api.ts               # API response types
│       │   ├── errors.ts            # Error types
│       │   └── utils.ts             # Utility types
│       │
│       └── utils/                   # Utility functions
│
├── tests/
│   ├── services/
│   │   └── geminiService.test.ts
│   ├── utils/
│   │   └── similarity.test.ts
│   └── setup.ts
│
├── examples/
│   ├── basic-comparison.ts
│   ├── batch-analysis.ts
│   ├── similarity-metrics.ts
│   └── README.md
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DEVELOPMENT.md
│   └── CONTRIBUTING.md
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── lint.yml
│       ├── build.yml
│       └── deploy.yml
│
├── public/
│   └── favicon.ico
│
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── jest.config.js                   # Jest configuration
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── package.json                     # Dependencies and scripts
└── .env.example                     # Environment template
```

---

## 📜 Available Scripts

### Development
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing & Quality
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check
```

### Docker
```bash
# Build development image
docker-compose build dev

# Run development container
docker-compose up dev

# Build production image
docker-compose build prod

# Run production container
docker-compose up prod

# View logs
docker-compose logs -f
```

---

## 💡 Usage Examples

### Example 1: Basic Code Comparison

```typescript
import { compareCode } from './services/geminiService';

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
  console.log(`Similarity: ${result.similarity}%`);
  console.log(`Verdict: ${result.verdict}`);
} catch (error) {
  console.error('Error:', error);
}
```

### Example 2: Batch Comparison

```typescript
import { batchCompareCode } from './services/geminiService';

const comparisons = [
  {
    source: 'function add(a, b) { return a + b; }',
    suspicious: 'function sum(x, y) { return x + y; }'
  },
  // ... more comparisons
];

const results = await batchCompareCode(comparisons);
```

### Example 3: Get Detailed Metrics

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

For more examples, see [examples/README.md](examples/README.md)

---

## 🏗 Architecture

### System Design

```
┌─────────────────────────────┐
│    React UI Components      │  User Interface Layer
├─────────────────────────────┤
│    Custom React Hooks       │  State Management
├─────────────────────────────┤
│    Service Layer            │  Business Logic
│  (Gemini API Integration)   │
├─────────────────────────────┤
│    Type Definitions         │  Type Safety
├─────────────────────────────┤
│  External APIs & Libraries  │  Integration Layer
└─────────────────────────────┘
```

### Data Flow

1. User inputs code to compare in the UI
2. React component calls Gemini service
3. Service formats prompt with analysis instructions
4. Google Generative AI API analyzes the code
5. API returns similarity metrics and verdict
6. Results are formatted and displayed in components
7. Charts and dashboards visualize the data

### Detection Methods

- **Token Analysis**: Compares individual code tokens
- **Structural Analysis**: Analyzes AST structure similarity
- **Semantic Analysis**: Compares code semantics using AI
- **Pattern Matching**: Identifies common code patterns

For detailed architecture, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## 📚 API Documentation

### Gemini Service API

#### `compareCode(sourceCode, suspiciousCode)`
Compare two code snippets for plagiarism.

**Parameters:**
- `sourceCode` (string): Original code
- `suspiciousCode` (string): Code to check

**Returns:** `Promise<ComparisonResult>`

**Response:**
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

#### `calculateSimilarityMetrics(code1, code2)`
Get detailed similarity metrics.

**Returns:** `Promise<SimilarityMetrics>`

```typescript
{
  tokenSimilarity: number;
  structuralSimilarity: number;
  semanticSimilarity: number;
  overallScore: number;
}
```

#### `batchCompareCode(comparisons)`
Compare multiple code pairs.

**Parameters:**
- `comparisons`: Array of `{source, suspicious}` objects

**Returns:** `Promise<ComparisonResult[]>`

For complete API documentation, see [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

---

## 🐳 Docker Deployment

### Development with Docker

```bash
# Build and run development environment
docker-compose up dev

# The app will be available at http://localhost:3000
```

### Production Deployment

```bash
# Build production image
docker build -f Dockerfile.prod -t plagiarism-detector:latest .

# Run production container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  plagiarism-detector:latest
```

### Using Docker Compose

```bash
# Start services
docker-compose -f docker-compose.prod.yml up

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale prod=3

# View logs
docker-compose logs -f prod

# Stop services
docker-compose -f docker-compose.prod.yml down
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make changes** following code standards
4. **Add tests** for new functionality
5. **Run tests and linting**: `npm run test && npm run lint`
6. **Commit with clear message**: `git commit -m "feat: description"`
7. **Push and create Pull Request**

### Code Standards
- Use TypeScript for all new files
- Add JSDoc comments to functions
- Follow ESLint rules
- Format with Prettier before committing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- geminiService.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── services/
│   └── geminiService.test.ts    # API service tests
└── utils/
    └── similarity.test.ts        # Utility function tests
```

### Coverage Goals
- Statements: 80%+
- Branches: 70%+
- Functions: 80%+
- Lines: 80%+

---

## 🚨 Troubleshooting

### Common Issues

#### "GEMINI_API_KEY is not set"
```bash
# Solution: Set environment variable
export GEMINI_API_KEY=your_api_key
# Or add to .env.local
```

#### Port 3000 already in use
```bash
# Use different port
npm run dev -- --port 3001
```

#### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript errors
```bash
# Check configuration
npm run build

# Fix issues
npm run lint:fix
```

### Getting Help
- Check [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- Review [API Documentation](docs/API_DOCUMENTATION.md)
- Check existing [GitHub Issues](https://github.com/rajasekhar1103/code-plagiarism-detection/issues)
- Create new issue with detailed information

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🔗 Resources

- [Google Generative AI Documentation](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 👥 Team & Support

**Maintainers:**
- Rajasekhar ([@rajasekhar1103](https://github.com/rajasekhar1103))

**Support:**
- 📧 Email: support@example.com
- 💬 Discussions: [GitHub Discussions](https://github.com/rajasekhar1103/code-plagiarism-detection/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/rajasekhar1103/code-plagiarism-detection/issues)

---

<div align="center">

**⭐ If you find this project helpful, please give it a star!**

[⬆ Back to top](#code-plagiarism-detection---ai-studio-application)

</div>
