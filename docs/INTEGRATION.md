# Integration Guide

This document provides instructions for integrating new modules into the code-plagiarism-detection system.

## Module Structure

Each module should follow this structure:
```
projects/[module-name]/
├── src/                    # Source code
├── tests/                  # Test files
├── docs/                   # Documentation
├── examples/              # Usage examples
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Build config
├── README.md              # Module README
├── Dockerfile             # Container config
└── docker-compose.yml     # Compose config
```

## Adding a New Module

1. **Create Module Directory**
   ```bash
   mkdir -p projects/[module-name]
   ```

2. **Initialize Package**
   ```bash
   cd projects/[module-name]
   npm init -y
   ```

3. **Setup Build Tools**
   - Copy Vite configuration
   - Copy TypeScript configuration
   - Add build scripts to package.json

4. **Create Structure**
   ```bash
   mkdir -p src/{components,services,types,utils}
   mkdir -p tests/{services,utils}
   mkdir -p docs examples
   ```

5. **Documentation**
   - Create README.md with module overview
   - Create docs/ARCHITECTURE.md
   - Create docs/DEVELOPMENT.md

6. **Git Integration**
   - Commit module with message: `feat: Add [module-name] module`
   - Include MODULES.md update
   - Update root README.md

## Module Dependencies

### Core Dependencies
- React 19.2.4+
- TypeScript 5.8.2+
- Vite 6.2.0+

### Optional Dependencies
- Recharts (visualization)
- Lucide React (icons)
- Google Generative AI SDK (API integration)

## CI/CD Integration

Each module includes:
- GitHub Actions workflows
- Docker support
- Pre-commit hooks
- Linting configuration

## Module Communication

Modules can interact through:
- Shared types in central type definitions
- Service abstractions
- Event systems
- API interfaces

## Versioning

Each module maintains its own version:
- Update package.json `version` field
- Tag with module-specific releases
- Document breaking changes in CHANGELOG

## Documentation Requirements

Every module must include:
1. README.md - Overview and quick start
2. docs/ARCHITECTURE.md - System design
3. docs/API_DOCUMENTATION.md - API reference
4. docs/DEVELOPMENT.md - Development setup
5. docs/CONTRIBUTING.md - Contribution guidelines

## Testing

Each module should have:
- Unit tests for services
- Component tests where applicable
- Integration tests
- Minimum 80% code coverage

## Deployment

Modules can be deployed:
- Standalone via Docker
- As part of monorepo
- To Vercel, Netlify, or other platforms
- Via GitHub Pages (for documentation)

## Support

For module integration support:
- Check existing modules as reference
- Review CONTRIBUTING.md guidelines
- Open GitHub issue for assistance
