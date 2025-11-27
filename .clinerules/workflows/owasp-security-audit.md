# OWASP Security Audit & Auto-Fix Workflow (Git-Aware)

This workflow guides Cline to:

1. Detect whether the project is a **Git repo or not**.
2. Detect the project’s tech stack (React / Angular / Flutter / Android / iOS / etc.).
3. Build an OWASP-based checklist for that stack.
4. Audit the codebase and classify each item.
5. Present a clear report to the user.
6. On user approval, implement missing items:
   - If **Git is available** → create branch → implement → review → commit & push on approval, or discard if rejected.
   - If **no Git** → implement changes **locally only**, no branch, no push (and clearly inform the user).

Important: Never commit or push without explicit written approval.

---

## 0. Detect Git Mode (Git vs Non-Git Project)

1. Check if this directory is a Git repository:

   - Try running:

     - `git rev-parse --is-inside-work-tree`

   - Or check if a `.git` directory exists in project root.

2. If Git is available and the repo is initialized:

   - Set **Mode = Git Mode**.
   - Tell the user:

     ```markdown
     Git repository detected.  
     Mode: **Git Mode** – I can create branches and, with your approval, commit and push changes.
     ```

3. If Git is **not** available or repo is not initialized:

   - Set **Mode = Non-Git Mode**.
   - Tell the user:

     ```markdown
     No Git repository detected in this project.  
     Mode: **Non-Git Mode** – I will:
     - Detect technology
     - Generate OWASP checklist
     - Audit the code
     - Optionally apply fixes **locally only** after your approval

     I will **not** create branches, commits, or push any changes because Git is not configured here.
     ```

4. All remaining steps must respect this mode:
   - **Git Mode** → branch + commit + push possible.
   - **Non-Git Mode** → no branch, no commit, no push. Only local file edits.

---

## 1. Detect Project Technology

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
- Mode: <Git Mode | Non-Git Mode>
```

If multiple apps/stacks exist, list them and ask the user which one to focus on.

If detection is uncertain, show findings and ask the user to choose a stack.

---

## 2. Generate OWASP Checklist for the Stack

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

Show the checklist and ask:

> “Do you approve this checklist, or would you like to add/remove items before I run the audit?”

Only proceed once the user confirms.

---

## 3. Audit the Codebase Against the Checklist

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

Add a “Critical Issues” section listing **High Priority** items that are `Not Implemented` or `Partially Implemented`.

---

## 4. Ask User Approval to Implement Missing Items

Summarize:

- Total items
- How many are missing or partial
- Count of missing high-priority items
- Mode (Git / Non-Git) and what that means

Example text:

```markdown
### Summary

- Total controls: X
- Implemented: Y
- Partially Implemented: Z
- Not Implemented: N
- Mode: <Git Mode | Non-Git Mode>

In **Git Mode**:
- I can create a branch, apply fixes, and only commit/push after your approval.

In **Non-Git Mode**:
- I can apply fixes **locally only**. There will be no branches, commits, or pushes.
```

Ask:

> “Do you approve implementing the missing/partial OWASP controls according to this mode?”

If user says **NO**, stop here and do not modify any code.

---

## 5. Git Mode: Prepare Git State (Skip in Non-Git Mode)

If **Mode = Non-Git Mode**, skip this section entirely and go to Step 7.

If **Mode = Git Mode**:

1. Run `git status`.

2. If working tree is not clean:
   - Show status summary.
   - Ask user:

     > “Your working tree has uncommitted changes.  
     > How should I proceed?
     > - Stash changes  
     > - Commit changes  
     > - Abort OWASP fix workflow”

   - Perform accordingly and ensure a clean state before continuing.

---

## 6. Git Mode: Create a New Branch (Skip in Non-Git Mode)

If **Mode = Git Mode**:

1. Create a dedicated branch:

   ```bash
   git checkout -b feature/owasp-hardening-<stack>-<YYYYMMDD>
   ```

   Example: `feature/owasp-hardening-react-20251124`

2. Inform the user:

   ```markdown
   Created branch: feature/owasp-hardening-<stack>-<YYYYMMDD>  
   All OWASP fixes will be applied on this branch.
   ```

If **Mode = Non-Git Mode**, do **not** create a branch and explicitly remind:

```markdown
Mode: Non-Git – I will apply OWASP fixes directly to the files locally (no branch, no commit, no push).
```

---

## 7. Implement Missing / Partial OWASP Controls (Both Modes)

For each `Not Implemented` or `Partially Implemented` item:

1. Plan changes that:
   - Respect existing architecture and code style.
   - Are minimal and focused.
   - Don’t break behavior without clear reason.

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
       - `xcodebuild` or project’s build command (if configured)

   - If builds/tests fail, show summary to user and adjust.

4. Maintain a change log:

   ```markdown
   ## Changes Implemented (Work in Progress)

   - WEB-AUTH-01: Added secure cookie flags in `server/config/...`.
   - WEB-VAL-01: Added server-side input validation in `src/api/auth/...`.
   - MOB-STOR-01: Switched to secure storage in `lib/services/auth_storage.dart`.
   ```

This step applies in **both Git Mode and Non-Git Mode**. The difference comes later when deciding whether to commit/push or not.

---

## 8. Recalculate Checklist Status

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
- Mode: <Git Mode | Non-Git Mode>
```

---

## 9. Show Diffs/Changes & Ask Final Approval

1. Present to the user:

   - Summary of changes.
   - Updated checklist and status.
   - List of modified files.
   - Diffs or summaries of key changes.

2. Ask explicitly:

   > “Do you approve these OWASP-related changes?
   >
   > - In **Git Mode**:  
   >   - YES → I will commit and push this branch.  
   >   - NO → I will discard the branch and undo all changes.  
   >
   > - In **Non-Git Mode**:  
   >   - YES → I’ll leave the local changes as they are (no push possible).  
   >   - NO → I will revert files back to their original state, as much as possible.”

---

## 10. Git Mode: If Approved → Commit and Push

If **Mode = Git Mode** and user approves:

1. Commit:

   ```bash
   git add .
   git commit -m "OWASP security hardening for <stack>: <short summary>"
   ```

2. Push (if remote is configured and user agrees):

   ```bash
   git push -u origin feature/owasp-hardening-<stack>-<YYYYMMDD>
   ```

3. Ask:

   > “Do you want me to create a Pull Request / Merge Request for this branch?”

If tools (like `gh`) are available, create a PR with:
- Title: `OWASP Security Hardening – <project>`
- Description: summary + checklist + key changes + any deferred items.

In **Non-Git Mode**, skip this step (no commit/push).

---

## 11. Git Mode: If Rejected → Discard Changes

If **Mode = Git Mode** and the user rejects the final changes:

1. Discard the work:

   ```bash
   git reset --hard
   git checkout main
   git branch -D feature/owasp-hardening-<stack>-<YYYYMMDD>
   ```

2. Inform the user:

   ```markdown
   All OWASP hardening changes on the feature branch have been discarded as requested.  
   No commits or pushes remain from this workflow.
   ```

---

## 12. Non-Git Mode: If Approved or Rejected

If **Mode = Non-Git Mode**:

- If user **approves**:
  - Inform:

    ```markdown
   Mode: Non-Git – OWASP fixes have been applied locally and left in place.  
   There are no branches, commits, or pushes.  
   You may manually copy or initialize Git later if you want to track these changes.
    ```

- If user **rejects**:
  - Attempt to revert files to their previous content using any available editor history or backup.  
  - Inform:

    ```markdown
   Mode: Non-Git – You rejected the OWASP fixes.  
   I attempted to revert files back to their previous state.  
   Please review your working directory to confirm everything looks correct.
    ```

---

## 13. Wrap Up

End with a short summary:

- What was done: audit only, or audit + fixes (and in which mode).
- Any remaining high-risk items that were deferred.

Ask:

> “Do you want to:
> - Run this OWASP workflow on another project/app here, or
> - Extend the checklist to more advanced OWASP ASVS/MASVS levels in another run?”

End workflow.

