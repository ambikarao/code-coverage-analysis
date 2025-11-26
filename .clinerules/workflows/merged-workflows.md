# Combined Workflow Instructions: Sonar → OWASP → Code Review

These instructions describe the combined step-by-step process for performing SonarQube issue fixes, OWASP security audit & fixes, and code review optimizations in sequence, with git operations at the end for all changes.

---

# Part 1: SonarQube Issues Fix Instructions

These instructions describe the step-by-step process for automatically fixing SonarQube issues first in the sequence.
<!-- as defined in the `fix-sonarqube-issues` workflow. -->

## Step 1: Fetch Raw Issues
Execute the shell command `cat sonar-issues.json` to read the entire contents of the SonarQube issues JSON file. Store this raw JSON data as `raw_issues` for use in subsequent steps.

## Step 2: Automatically Fix All Issues
Use an AI agent to process all SonarQube rule violations listed in the JSON data. The agent should perform the following:

1. Parse the JSON and group issues by file path.
2. For each affected file:
   - Open and read the file content.
   - For each issue in the file, apply the appropriate fix based on the Sonar rule ID (e.g., S1128 for unused imports, S1481 for unused local variables, S2095 for completing resource closure).
   - Resolve ALL issues in the file using minimal and safe code changes.
   - Preserve the original code behavior.
   - After each fix, re-evaluate the file against remaining issues to ensure compatibility.
   - Generate a unified diff patch showing all changes made to the file.
3. Output the collection of all patches as `sonar_patches`.

## Step 3: Apply Sonar Patches
Apply the generated unified diff patches (`sonar_patches`) to the relevant files in the codebase.

---

# Part 2: OWASP Security Audit & Auto-Fix Workflow (Execute Second in Sequence)

This workflow guides Cline to detect project technology, perform OWASP audit, and apply fixes after Sonar fixes are complete.

## Step 1: Detect Project Technology
Scan repository structure and key files:

Web:
- React / Next.js / Vite → `package.json`, `react`, `react-dom`, `next`, `vite`
- Angular → `angular.json`, `@angular/core` in `package.json`

Mobile:
- Flutter → `pubspec.yaml`, `lib/main.dart`, `android/`, `ios/`
- Android → `AndroidManifest.xml`, `build.gradle`, `*.kt`, `*.java`
- iOS → `.xcodeproj` / `.xcworkspace`, `*.swift`, `*.m`, `Info.plist`

Output summary:

```markdown
## Detected Project

- Name/Path: <project name or folder>
- Stack: <React / Angular / Flutter / Android / iOS / Other>
- Indicators: <list of key files/dependencies>
```

## Step 2: Generate OWASP Checklist for the Stack
Use OWASP ASVS (web) or OWASP MASVS (mobile) as guidance.

Build a practical checklist with columns:

- ID (e.g., `WEB-AUTH-01`, `MOB-NET-01`)
- Area (Authentication, Authorization, Network, Storage, Validation, Logging, etc.)
- Description
- Expected Evidence (what to look for)
- Priority (High / Medium / Low)

Show the checklist and ask: "Do you approve this checklist, or would you like to add/remove items before I run the audit?" Proceed once confirmed.

## Step 3: Audit the Codebase Against the Checklist
Perform audit and produce report with status for each item.

## Step 4: Implement Missing / Partial OWASP Controls
Apply fixes directly to implement missing/partial OWASP controls after Sonar fixes:

For each missing/partial item, implement changes according to stack (Web/Mobile), run tests/builds, and maintain a change log.

## Step 5: Recalculate Checklist Status
Re-evaluate and produce updated OWASP status report.

---

# Part 3: Code Review and Optimize Instructions (Execute Last in Sequence)

These instructions describe performing code review and optimizations after Sonar and OWASP fixes are complete.
<!-- as defined in the `code-review-and-optimize` workflow. -->

## Step 1: List Source Files
Execute command `git ls-files | grep -E '\\.(js|ts|jsx|tsx|java|py|go|cs|cpp|c|rb|php|rs|scala|kt|swift)$' || true` to list source files. Store as `source_files`.

## Step 2: Perform Full Code Review (List Findings Only)
Use AI agent to conduct comprehensive code review across source files, identifying code smells, performance issues, etc. Store findings as `review_findings`.

## Step 3: Perform Linting Checks
Execute `npm run lint || python -m pylint src/ || echo "No linting configured"` and store as `linting_findings`.

## Step 4: Generate Optimization Patches (Conditional)
Prompt user for approval: "Here is the list of all code review findings:\n\n{{review_findings}}\n\nAnd linting findings:\n\n{{linting_findings}}\n\nWould you like me to FIX and OPTIMIZE all these issues automatically? Reply YES or NO.\nIMPORTANT: Answer EXACTLY YES or NO." If YES, generate optimization patches as `review_patches`.

## Step 5: Apply Code Review Patches
Apply `review_patches` to relevant files.

---

# Part 4: Combined Git Operations for All Workflow Changes

After completing Sonar fixes, OWASP implementations, and Code Review optimizations:

## Step 1: Ask for User Git Permission for All Changes
Prompt the user with: "All SonarQube fixes, OWASP implementations, and Code Review optimizations have been applied. Would you like me to create a Git branch and commit/push ALL these combined changes? Reply YES or NO. IMPORTANT: Answer EXACTLY YES or NO." Store response as `combined_git_decision`.

## Step 2 (Conditional): Create Combined Git Branch
If "YES", create a Git branch named `combined/workflow-{timestamp}` (timestamp YYYYMMDDHHMMSS format).

## Step 3 (Conditional): Stage All Changes
If "YES", execute `git add .`.

## Step 4 (Conditional): Commit All Changes
If "YES", commit with message "combined: SonarQube fixes, OWASP hardening, and code review optimizations via Cline workflows".

## Step 5 (Conditional): Push Combined Changes
If "YES", execute `git push -u origin HEAD`.
