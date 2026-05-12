# Contributing Guidelines

## Code Standards

### TypeScript
- Use strict mode
- Avoid `any` types
- Document complex types with JSDoc

### React Components
- Use functional components with hooks
- Props should have TypeScript interfaces
- Add JSDoc for component purpose
- Keep components focused and single-responsibility

### Naming Conventions
- PascalCase for components: `MyComponent.tsx`
- camelCase for files: `myService.ts`, `myUtil.ts`
- UPPER_SNAKE_CASE for constants
- Private methods prefix with `_`

### Code Organization
- Import statements at top (React, external, internal)
- Props interface above component
- Hook definitions first
- JSX after logic

### JSDoc Comments
```typescript
/**
 * Brief description
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 */
```

## Testing Requirements

- Write unit tests for services
- Mock external API calls
- Aim for 80%+ code coverage
- Test error cases

## Git Workflow

1. Create feature branch: `git checkout -b feature/description`
2. Make changes and commit: `git commit -m "type: description"`
3. Commit types: feat, fix, refactor, test, docs, style, ci
4. Push and create pull request

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Run linting and tests locally
4. Request code review
5. Address feedback
6. Merge when approved

## Performance Considerations

- Optimize API calls (batch when possible)
- Implement caching for repeated comparisons
- Lazy load components when appropriate
- Monitor bundle size
