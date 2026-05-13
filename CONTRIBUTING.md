# Contributing Guidelines

Thank you for your interest in contributing to the Code Plagiarism Detection project!

## Code of Conduct

- Be respectful to all contributors
- Report issues constructively
- Maintain professional communication

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/description`
4. Install dependencies: `npm install`
5. Make your changes
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `test:` Test addition/modification
- `docs:` Documentation changes
- `style:` Code style changes
- `ci:` CI/CD changes
- `chore:` Maintenance

**Example:**
```
feat(gemini-service): Add batch comparison support

- Implement batchCompareCode function
- Add rate limiting
- Add progress tracking

Closes #123
```

## Pull Request Process

1. Update documentation for new features
2. Add or update tests
3. Ensure all tests pass: `npm run test`
4. Run linting: `npm run lint`
5. Run formatting: `npm run format`
6. Request review from maintainers
7. Address feedback and update PR
8. Merge when approved

## Code Style

- TypeScript for all new code
- Avoid `any` types
- Add JSDoc comments
- Follow ESLint rules
- Format with Prettier

## Testing Requirements

- Write tests for all new features
- Maintain 80%+ code coverage
- Test both success and error cases
- Mock external API calls

## Documentation

- Update README if needed
- Document public APIs with JSDoc
- Add examples for new features
- Update CHANGELOG

## Performance

- Minimize bundle size
- Optimize API calls
- Implement caching where appropriate
- Profile before optimization

## Reporting Issues

Include in issue reports:
- Reproduction steps
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots/logs if applicable

## Questions?

- Check existing documentation
- Search closed issues
- Open a discussion
- Comment on relevant issue

Thank you for contributing! 🙌
