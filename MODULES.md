# Project Modules

This repository contains multiple specialized projects for code plagiarism detection and analysis.

## Modules

### plagiarism-detector-ui

**Location:** `projects/plagiarism-detector-ui/`

React-based UI for code plagiarism detection powered by Google Generative AI.

**Features:**
- Real-time code comparison
- AST-based similarity analysis
- AI-powered plagiarism detection
- Visual dashboards and charts
- Batch analysis capabilities

**Tech Stack:**
- React 19.2.4+
- TypeScript 5.8.2+
- Vite (Build tool)
- Google Generative AI SDK
- Recharts (Visualization)
- Tailwind CSS (Styling)

**Quick Start:**
```bash
cd projects/plagiarism-detector-ui
npm install
cp .env.example .env.local
npm run dev
```

**Documentation:**
- [Architecture](projects/plagiarism-detector-ui/docs/ARCHITECTURE.md)
- [API Documentation](projects/plagiarism-detector-ui/docs/API_DOCUMENTATION.md)
- [Development Guide](projects/plagiarism-detector-ui/docs/DEVELOPMENT.md)
- [Contributing](projects/plagiarism-detector-ui/docs/CONTRIBUTING.md)

## Installation

### Install All Modules
```bash
npm install
npm run install:modules
```

### Install Specific Module
```bash
cd projects/plagiarism-detector-ui
npm install
```

## Development

### Run All Modules
```bash
npm run dev:all
```

### Run Specific Module
```bash
cd projects/plagiarism-detector-ui
npm run dev
```

## Building

### Build All Modules
```bash
npm run build:all
```

### Build Specific Module
```bash
cd projects/plagiarism-detector-ui
npm run build
```

## Testing

### Test All Modules
```bash
npm run test:all
```

### Test Specific Module
```bash
cd projects/plagiarism-detector-ui
npm run test
```

## Docker

### Build Docker Image
```bash
docker-compose build
```

### Run with Docker
```bash
docker-compose up
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See LICENSE file for details
