# Workflow:  Code Review
## Objective
Review the curent branch for code quality, security, and compliance before merging.

## Steps

### 1. Scan Current Branch
- Use `<run_command>`:
  ```bash
  git branch --show-current

• Confirm the branch name with the user.
￼
2. Analyze Code Quality
• Use <search_files> to locate all files.
• Apply <read_file> for each files in the branch. Exclude test files and test coverage.
• Check for these issues one by one:
    1. Static Code Analysis
        • Linting: Ensure code follows style guidelines (e.g., ESLint, Pylint, Checkstyle).
        • Cyclomatic Complexity: Measures complexity of functions/methods.
        • Code Smells: Detect anti-patterns or maintainability issues.
        • Coding Standards
    2. Security Checks
        • Dependency Vulnerability Scan (e.g., OWASP Dependency-Check, Snyk).
        • Static Application Security Testing (SAST) for insecure code patterns.
    3. Performance & Maintainability
        • Code Duplication: Identify repeated logic.
        • Maintainability Index: Composite metric based on complexity, lines of code, etc
    4. Improvement areas
￼
3. Generate Structured Review Report
• Use <new_task>:
    • Summarize findings for each criteria
    1. Static Code Analysis
    2. Security Issues
    3. Performance Issues
    4. Improvement areas
    • Highlight critical issues.
    • List the files which has require attention based on Step #2 analysis
    • Suggest improvements
   Ensure this step is complete before moving to Step #4

4. Create Actionable Tasks
- **For each file**: List specific line numbers and issues
- **Provide fix examples** with before/after code
- **Estimate effort** (trivial, easy, medium, hard)
- **Suggest refactoring strategies**

5. Apply Suggested Fixes (User Confirmation Required)
#### 7.1 Pre-Fix Confirmation
- **Ask user**: "Do you want to apply the automated safe fixes? (ESLint auto-fix, import sorting, formatting)"
- **If yes, proceed to safe automated fixes for all files**
- **If no, skip to manual review**

6. Safe Automated Fixes (With User Approval)
- **ESLint auto-fix**: `npx eslint src --ext .ts,.tsx,.js,.jsx --fix`
- **Import sorting**: Auto-sort and organize imports
- **Remove unused variables** (with care)

7. Fix Validation & Testing
- **After each fix category**: Re-run build and tests to ensure no regressions
- **Ask user**: "Fixes applied successfully. Run full test suite? (y/n)"

8. Final Validation
- **Re-run checks**: Ensure fixes don't break anything
- **Final build**: `npm run build`
- **Final test**: `npm run test`

9. Commit & Push (User Confirmation Required)
#### 9.1 Pre-Commit Confirmation
- **Ask user**: "Do you want to commit the applied fixes? (y/n)"
- **If yes, proceed to staging and committing**
- **If no, stop here - changes remain uncommitted**

10. Commit Process (With User Approval)
- **Stage fixes**: `git add .`
- **Show staged changes**: `git status`
- **Ask user**: "Review the staged changes above. Proceed with commit? (y/n)"
- **If yes, create commit**: `git commit -m "fix: address code review findings [category]"`

11. Push Process (With Final Confirmation)
- **Ask user**: "Do you want to push the committed changes to remote branch? (y/n)"
- **If yes, push changes**: `git push origin <branch>`
- **If no, commit remains local - can be pushed later**

12. Create Pull Request (User Confirmation Required)
#### 10.1 Pre-PR Confirmation
- **Ask user**: "Do you want to create a pull request for the committed changes? (y/n)"
- **If yes, proceed to PR creation**
- **If no, workflow ends here - ready for PR when user chooses**

13. PR Preparation
- **Show current branch**: `git branch --show-current`
- **Show commit log**: `git log --oneline -5`
- **Ask user**: "Review the commits above. Proceed with PR creation? (y/n)"

14. PR Creation Process (With User Approval)
- **Generate PR title**: Based on commit messages (suggest conventional format)
- **Generate PR description**: Include code review summary and fixed issues
- **Ask user**: "Do you want to create the PR with the suggested title and description? (y/n) or provide custom title:"
- **If yes, create PR**: `gh pr create --title "PR Title" --body "PR Description" --base main --head <branch>`

15. Post-PR Actions
- **Show PR URL**: Display the created pull request link
- **Suggest next steps**: "PR created successfully. You can now assign reviewers or request reviews."



<!-- 4. Post Review on GitHub
• Ask user:
• Do you want to post review comments in GitHub?
• Use <run_command>:
• gh pr comment <PR_NUMBER> --body "Review Summary: ..." -->

<!-- 4. Apply Suggested Fixes for all files
• Ask user:
• Do you want to apply the suggested fixes now?

• If yes:
    • Implement fixes in the codebase. Don't wait for approval
    • Use <run_command>:
    • git add .
5. Confirm Commit
• Ask user:
• Do you want to commit the fixes now?
• If yes:
git commit -m "Applied suggested fixes from PR review"
git push origin <branch>

• Confirm with user before pushing changes. -->