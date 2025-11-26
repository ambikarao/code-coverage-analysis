# Code Review and Optimize Instructions

These instructions describe the step-by-step process for performing a full repository code review and automatically optimizing code quality, performance, maintainability, architecture, and security. Framework-agnostic.
<!-- as defined in the `code-review-and-optimize` workflow. -->

## Step 1: Collect Source Files Notice
Execute the shell command `echo Collecting all source files...` to display a message indicating the collection process is starting. Store this output as `collect_notice` for reference.

## Step 2: List Source Files
Execute the shell command `git ls-files | grep -E '\\.(js|ts|jsx|tsx|java|py|go|cs|cpp|c|rb|php|rs|scala|kt|swift)$' || true` to list all Git-tracked source code files with supported extensions. Store the complete list of file paths as `source_files` for use in the code review process.

## Step 3: Perform Full Code Review (List Findings Only)
Use an AI agent to conduct a comprehensive code review across all provided source files. The agent must perform the following responsibilities:

1. Parse the list of all files provided (`{{source_files}}`).
2. For each file, perform a deep code review to identify issues (DO NOT apply fixes yet):
   - Identify all code smells
   - Detect performance inefficiencies
   - Detect architectural issues
   - Flag dead code / redundant logic
   - Identify readability or maintainability issues
   - Identify complexity hot-spots
   - Identify error-handling gaps
   - Identify security issues or unsafe patterns
   - Identify inconsistent naming or patterns
3. Output a structured list of all findings only. DO NOT generate patches or code changes.

Store the resulting list of review findings as `review_findings`.

## Step 4: Ask User for Approval to Apply Fixes
Prompt the user with: "Here is the list of all code review findings detected:\n\n{{review_findings}}\n\nWould you like me to FIX and OPTIMIZE all these issues automatically? Reply YES or NO.\nIMPORTANT: Answer EXACTLY YES or NO." Store the user's response as `apply_fixes_decision`.

## Step 5: Generate Optimization Patches (Conditional)
If the user responded with "YES", use an AI agent to automatically fix and optimize all issues detected in the review. The agent must perform the following for each file:

1. Apply refactoring
2. Remove dead code
3. Optimize performance
4. Improve maintainability & readability
5. Reduce complexity
6. Fix anti-patterns
7. Improve security
8. Preserve program behavior
9. Produce unified diff patches only (no full rewrites)

Store the resulting unified diff patches as `review_patches`.

## Step 6: Apply Code Review Patches
Apply the generated unified diff patches (`{{review_patches}}`) to the relevant files in the codebase.

## Step 7: Ask User for Git Commit Permission
Prompt the user with: "All optimizations have been applied.\nWould you like me to create a Git branch and commit/push these changes? Reply YES or NO.\nIMPORTANT: Respond with EXACTLY YES or NO." Store the user's response as `user_decision`.

## Step 8 (Conditional): Create Git Branch
If the user responded with "YES", create a new Git branch using the shell command `BRANCH=optimize/code-review-$(node -e "console.log(new Date().toISOString().replace(/[-:T.]/g,''))"); git checkout -b $BRANCH`. Store the output as `branch_output`.

## Step 9 (Conditional): Stage Changes
If the user responded with "YES", add all changes to the Git staging area with the command `git add .`. Store the output as `git_add_output`.

## Step 10 (Conditional): Commit Changes
If the user responded with "YES", commit the changes with the message "refactor: automated repository-wide code review & optimization via Cline workflow". Store the output as `git_commit_output`.

## Step 11 (Conditional): Push Changes
If the user responded with "YES", push the changes to the remote repository with the command `git push -u origin HEAD`. Store the output as `git_push_output`.