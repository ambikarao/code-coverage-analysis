# Sonar Issues Fix Workflow

This workflow runs SonarQube analysis on the project using ESLint with the sonarjs plugin, identifies issues, and fixes them according to SonarQube rules.

## Steps

1. **Configure ESLint**: Ensure `.eslintrc.json` includes `plugin:sonarjs/recommended` in extends
2. **Run Sonar Analysis**: Execute ESLint with sonarjs plugin to identify code quality issues
3. **Analyze Issues**: Review the identified issues and their severity
4. **Fix Issues**: Apply fixes for sonarjs rules violations
5. **Create Branch**: Create a new git branch for the fixes
6. **Commit Changes**: Commit all the fixes to the branch
7. **Get User Consent**: Ask user for confirmation before pushing
8. **Push Branch**: If consented, push the branch to remote repository

## SonarQube Rules Covered

This workflow addresses the following SonarQube rules:
- Cognitive complexity limits
- Code duplication detection
- Unused variables and code
- Preferential coding patterns (object literals, immediate returns, etc.)
- Control flow optimizations (collapsible if statements, redundant jumps)

## Configuration

The project should have:
- `sonar-project.properties` with project configuration
- `.eslintrc.json` with `sonarjs/recommended` plugin enabled
- `eslint-plugin-sonarjs` installed as a dependency

## Example Sonar Analysis Command

```bash
npx eslint src --ext .ts,.tsx --format=json --config .eslintrc.json
```

## SonarQube Server Integration

For full SonarQube server integration, ensure:
- SonarQube server is running at the configured host
- Project token is properly configured in `sonar-project.properties`
