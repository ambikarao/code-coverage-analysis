# Code Review and Optimize Workflow

These instructions describe performing code review and optimizations after Sonar and OWASP fixes are complete.
<!-- as defined in the `code-review-and-optimize` workflow. -->

## Step 1: Perform Linting Checks
Execute `npm run lint || python -m pylint src/ || echo "No linting configured"` and store as `linting_findings`.

## Step 2: Apply Code Review Patches
Apply `review_patches` to relevant files.

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
