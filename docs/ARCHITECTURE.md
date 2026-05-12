# Architecture Documentation

## System Overview

The Code Plagiarism Detection UI is a React-based application that integrates with Google's Generative AI API to detect potential code plagiarism using multiple analysis methods.

### Architecture Layers

```
┌─────────────────────────────┐
│     React UI Components     │
├─────────────────────────────┤
│     Custom React Hooks      │
├─────────────────────────────┤
│     Service Layer           │
│  (Gemini API Integration)   │
├─────────────────────────────┤
│     Type Definitions        │
├─────────────────────────────┤
│  External APIs & Libraries  │
└─────────────────────────────┘
```

### Component Structure

- **components/**: React components organized by domain
  - `App.tsx`: Main application component
  - `common/`: Reusable UI components (Button, Card, Badge, Modal)
  - `charts/`: Data visualization components

- **services/**: Business logic and API integration
  - `geminiService.ts`: Google Generative AI integration

- **types/**: TypeScript type definitions
  - `index.ts`: Core types
  - `api.ts`: API response types
  - `errors.ts`: Error types
  - `utils.ts`: Utility types

## Data Flow

1. User inputs code to compare
2. UI component sends request to Gemini Service
3. Service formats prompt and calls Google Generative AI API
4. API returns analysis results (similarity, verdict, methods)
5. Results are formatted and displayed in UI components

## Analysis Methods

The system uses multiple detection methods:

1. **Token-based Analysis**: Compares individual tokens/identifiers
2. **Structural Analysis**: Analyzes AST structure similarity
3. **Semantic Analysis**: Compares code semantics and logic
4. **Pattern Matching**: Identifies common code patterns

## Security & Performance

- API keys are stored in environment variables
- Rate limiting is implemented for batch operations
- Results are cached when applicable
- UI is responsive and optimized for performance

## Integration Points

- **Google Generative AI API**: Core analysis engine
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **Tailwind CSS**: Styling framework
