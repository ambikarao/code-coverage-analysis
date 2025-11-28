# Code Review and Optimize Workflow

These instructions describe performing linting checks, and automatic fix application with sequential file processing to ensure accuracy.
<!-- as defined in the `code-review-and-optimize` workflow. -->

## Step 1: Perform Linting Checks
Execute `npm run lint || python -m pylint src/ || echo "No linting configured"` and store as `linting_findings`.

## Step 2: Process Files Sequentially
Instead of processing all files simultaneously:

1. **File Discovery**: Identify all relevant source files (e.g., `src/**/*.tsx`, `src/**/*.ts`, `src/**/*.jsx`, `src/**/*.js`)

2. **Sequential Processing**: For each file individually:
   - Read the current file content
   - Analyze linting issues specific to this file
   - Generate targeted fixes with full file context
   - Apply minimal, safe changes
   - Validate the changes don't break existing functionality
   - If validation fails, rollback changes and skip this file

## Step 3: Apply Code Review Patches
Apply validated `review_patches` to files one by one, ensuring each change is accurate and isolated.

---

# Combined Git Operations

After completing code review and optimizations:

## Step 1: Ask for User Git Permission
Prompt the user with: "Would you like me to create a Git branch and commit/push ALL these combined changes? Reply YES or NO. IMPORTANT: Answer EXACTLY YES or NO." Store response as `combined_git_decision`.

## Step 2 (Conditional): Create Combined Git Branch
If "YES", create a Git branch named `combined/workflow-{timestamp}` (timestamp YYYYMMDDHHMMSS format).

## Step 3 (Conditional): Stage All Changes
If "YES", execute `git add .`.

## Step 4 (Conditional): Commit All Changes
If "YES", commit with message "combined: SonarQube fixes, OWASP hardening, and code review optimizations via Cline workflows".

## Step 5 (Conditional): Push Combined Changes
If "YES", execute `git push -u origin HEAD`.
