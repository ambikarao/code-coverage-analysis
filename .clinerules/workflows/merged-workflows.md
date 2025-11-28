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

# Part 2: Code Review and Optimize Instructions (Execute Last in Sequence)

These instructions describe performing lint checks by detecting project technology and applying patches for the issues with sequential processing to ensure accuracy.
<!-- as defined in the `code-review-and-optimize` workflow. -->

## Step 1: Perform Linting Checks
Execute `npm run lint || python -m pylint src/ || echo "No linting configured"` and store as `linting_findings`.

## Step 2: Process Files Sequentially to Avoid Context Loss
Instead of processing all files simultaneously (which can lead to inaccurate changes), process each file individually:

1. **File Discovery**: Identify all relevant source files (e.g., `src/**/*.tsx`, `src/**/*.ts`, `src/**/*.jsx`, `src/**/*.js`)

2. **Sequential Processing**: For each file individually:
   - Read the complete current file content
   - Analyze linting issues specific to this file only
   - Generate targeted fixes with full context of the file's logic and dependencies
   - Apply minimal, behavior-preserving changes
   - Validate changes don't break builds: run `npm run build` or `npm test` if available
   - If validation fails, rollback changes and skip this file
   - Log successful changes for review

## Step 3: Apply Validated Code Review Patches
Apply the validated `review_patches` to files one by one, ensuring each change is:
- Accurate (matches single-file processing behavior)
- Behavior-preserving
- Minimal and focused

---

# Part 3: OWASP Security Audit & Auto-Fix Workflow (Execute Second in Sequence)

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

If multiple apps/stacks exist, list them and ask the user which one to focus on.

If detection is uncertain, show findings and ask the user to choose a stack.

## Step 2: Generate OWASP Checklist for the Stack
Use OWASP ASVS (web) or OWASP MASVS (mobile) as guidance.

Build a practical checklist with columns:

- ID (e.g., `WEB-AUTH-01`, `MOB-NET-01`)
- Area (Authentication, Authorization, Network, Storage, Validation, Logging, etc.)
- Description
- Expected Evidence (what to look for)
- Priority (High / Medium / Low)

Example:

```markdown
## OWASP Checklist

| ID           | Area           | Description                                   | Evidence / Where to Check                            | Priority |
|-------------|----------------|-----------------------------------------------|------------------------------------------------------|----------|
| WEB-AUTH-01 | Authentication | Secure session cookies (HttpOnly, Secure)     | Backend/proxy config for cookie flags                | High     |
| WEB-VAL-01  | Validation     | Validate all user input (client + server)     | UI forms + API handlers                              | High     |
| MOB-NET-01  | Network        | Enforce TLS                                   | Network security config / ATS / HTTP client config   | High     |
| MOB-STOR-01 | Storage        | Use secure storage for sensitive data         | KeyStore/Keychain/secure storage APIs usage          | High     |
```

Tailor items to the stack:

- **React/Angular/Web**
  - XSS prevention and safe rendering (no unsafe `innerHTML` without sanitizing).
  - Secure cookies / tokens (no secrets in front-end).
  - CSRF protections if relevant.
  - Security headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.).
  - Input validation and output encoding.
  - Error/logging hygiene (no sensitive data leaks).

- **Flutter/Android/iOS**
  - Secure storage for tokens and credentials.
  - TLS enforcement and certificate validation.
  - Network security configuration / ATS.
  - No sensitive data in logs.
  - Obfuscation/minification for release builds.

Show the checklist and ask: "Do you approve this checklist, or would you like to add/remove items before I run the audit?" Proceed once confirmed.

## Step 3: Audit the Codebase Against the Checklist
For each checklist item:

- Search for expected evidence:
  - Code (`src/`, `lib/`, `app/`, etc.).
  - Config files (`AndroidManifest.xml`, `Info.plist`, `network_security_config.xml`, environment files, etc.).
  - Build configs and environment/script files.

Determine status:

- Implemented
- Partially Implemented
- Not Implemented
- Not Applicable (with justification)

Produce a report:

```markdown
## OWASP Audit Results

| ID           | Area           | Description                           | Status               | Evidence / References                               |
|-------------|----------------|---------------------------------------|----------------------|-----------------------------------------------------|
| WEB-AUTH-01 | Authentication | Secure session cookies                | Not Implemented      | No secure cookie flags found in backend config.     |
| WEB-VAL-01  | Validation     | Validate all user input client+server | Partially Implemented| Client-only validation in `src/forms/...`           |
| MOB-NET-01  | Network        | Enforce TLS                           | Implemented          | `network_security_config.xml` enforces HTTPS only.  |
```

Add a "Critical Issues" section listing **High Priority** items that are `Not Implemented` or `Partially Implemented`.

## Step 4: Ask User Approval to Implement Missing Items
Summarize:

- Total items
- How many are missing or partial
- Count of missing high-priority items

Example text:

```markdown
### Summary

- Total controls: X
- Implemented: Y
- Partially Implemented: Z
- Not Implemented: N
```

Ask: "Do you approve implementing the missing/partial OWASP controls?"

If user says **NO**, stop here and do not modify any code.

## Step 5: Implement Missing / Partial OWASP Controls
For each `Not Implemented` or `Partially Implemented` item:

1. Plan changes that:
   - Respect existing architecture and code style.
   - Are minimal and focused.
   - Don't break behavior without clear reason.

2. Implement changes according to stack:

   **Web (React/Angular/SPA/etc.):**
   - Add/adjust security headers in backend/reverse proxy/framework config.
   - Fix unsafe HTML rendering (`dangerouslySetInnerHTML`, `innerHTML`, etc.).
   - Add or improve client + server input validation.
   - Avoid storing secrets in front-end bundles.
   - Add or strengthen CSP and other headers where appropriate.

   **Mobile (Flutter/Android/iOS):**
   - Use secure storage for tokens/secrets.
   - Configure TLS/network security rules.
   - Disable cleartext traffic where possible.
   - Remove logs that contain sensitive data.
   - Enable obfuscation/minification for release builds.

3. After logical groups of changes:

   - Run appropriate tests/builds:

     - React/Angular:
       - `npm test`
       - `npm run lint`
       - `npm run build`
     - Flutter:
       - `flutter analyze`
       - `flutter test` (if any)
       - `flutter build` (dry run if appropriate)
     - Android:
       - `./gradlew test`
       - `./gradlew assembleDebug` or `assembleRelease`
     - iOS:
       - `xcodebuild` or project's build command (if configured)

   - If builds/tests fail, show summary to user and adjust.

4. Maintain a change log:

   ```markdown
   ## Changes Implemented (Work in Progress)

   - WEB-AUTH-01: Added secure cookie flags in `server/config/...`.
   - WEB-VAL-01: Added server-side input validation in `src/api/auth/...`.
   - MOB-STOR-01: Switched to secure storage in `lib/services/auth_storage.dart`.
   ```

## Step 6: Recalculate Checklist Status
After all fixes:

1. Re-evaluate each OWASP checklist item.
2. Update status and evidence.
3. Produce an updated report similar to the initial one, now reflecting fixes.

Example:

```markdown
## Updated OWASP Status After Fixes

| ID           | Area           | Description                        | Status          | Evidence                                  |
|-------------|----------------|------------------------------------|-----------------|-------------------------------------------|
| WEB-AUTH-01 | Authentication | Secure session cookies             | Implemented     | Cookie flags set in `server/config/...`.  |
| WEB-VAL-01  | Validation     | Client + server input validation   | Implemented     | New server checks in `src/api/...`.       |
| MOB-STOR-01 | Storage        | Secure storage for tokens          | Implemented     | Using secure storage API in `lib/...`.    |
```

Add:

```markdown
## Summary of OWASP Hardening

- Total controls: X
- Implemented: Y
- Partially Implemented: Z
- Not Implemented: N (explicitly deferred or out of scope)
```

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
