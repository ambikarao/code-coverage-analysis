# SonarQube Issues Fix Instructions

These instructions describe the step-by-step process for automatically fixing SonarQube issues 
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
3. Output the collection of all patches as `patches`.

## Step 3: Apply Patches
Apply the generated unified diff patches (`patches`) to the relevant files in the codebase.

## Step 4: Ask for User Permission
Prompt the user with: "All fixes have been applied. Would you like me to create a Git branch and commit/push these changes? Reply with YES or NO." Store the user's response as `user_decision`.

## Step 5 (Conditional): Create Git Branch
If the user responded with "YES", create a new Git branch with the name `fix/sonarqube-issues-{timestamp}` (where timestamp is the current date and time in YYYYMMDDHHMMSS format). Store the output as `branch_output`.

## Step 6 (Conditional): Stage Changes
If the user responded with "YES", add all changes to the Git staging area with the command `git add .`. Store the output as `git_add_output`.

## Step 7 (Conditional): Commit Changes
If the user responded with "YES", commit the changes with the message "fix: automated SonarQube issue resolution via Cline workflow". Store the output as `git_commit_output`.

## Step 8 (Conditional): Push Changes
