# Development Guide

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key to `.env.local`

3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── plagiarism-detector-ui/
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
tests/                    # Test files
docs/                     # Documentation
```

## Code Style

- Use TypeScript for all files
- Follow ESLint rules
- Format with Prettier before committing
- Add JSDoc comments to functions

## Running Commands

```bash
# Development
npm run dev

# Build
npm run build

# Linting
npm run lint

# Formatting
npm run format

# Testing
npm run test

# Docker
docker-compose up
```

## Adding New Components

1. Create component file in `src/components/`
2. Add TypeScript interfaces/props
3. Add JSDoc comments
4. Export from `index.ts`
5. Add unit tests

## Common Patterns

### Using Gemini Service
```typescript
import { compareCode } from '@/services/geminiService';

try {
  const result = await compareCode(source, suspicious);
  // Handle result
} catch (error) {
  console.error('Comparison failed:', error);
}
```

### Component Template
```typescript
interface ComponentProps {
  // Define props
}

export const Component: React.FC<ComponentProps> = (props) => {
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## Debugging

Enable debug logs by setting environment variable:
```bash
DEBUG=plagiarism-detector:* npm run dev
```
