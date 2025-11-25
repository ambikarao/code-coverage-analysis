# Fix SonarQube Issues

Run Sonar Scanner → Fetch all SonarQube issues → Automatically fix every rule violation using Cline → Apply patches.

---

## Workflow: fix-sonarqube-issues

```json
{
 "name": "fix-sonarqube-issues",
 "description": "Fetch issues from sonar-issues.json and automatically fix all SonarQube rule violations across the workspace.",
 "trigger": "fix sonarqube issues",
 "actions": [
  {
   "action": "shell",
   "run": "cat sonar-issues.json",
   "output_to": "raw_issues"
  },
  {
   "action": "agent",
   "task": "You are fixing all SonarQube issues listed in the JSON below. Parse this JSON and group issues by file path. For each file:\n\n1. Open the file content.\n2. For each issue, apply the correct fix according to the Sonar rule ID (examples: S1128, S1481, S2095).\n3. Fix ALL issues in the file.\n4. Use minimal safe diffs.\n5. Preserve behavior.\n6. After applying each fix, re-evaluate the file against all remaining issues.\n7. When all issues for the file are resolved, produce a unified diff patch.\n\nJSON issues:\n{{raw_issues}}",
   "output_to": "patches"
  },
  {
   "action": "apply_patch",
   "patch": "{{patches}}"
  },
  // -----------------------------
    // NEW: Ask for User Permission
    // -----------------------------
    {
      "action": "agent",
      "task": "All fixes have been applied.\n\nWould you like me to create a Git branch and commit/push these changes? Reply with YES or NO.",
      "output_to": "user_decision"
    },
    // -----------------------------
    // NEW: Conditionally run Git logic
    // -----------------------------
    {
      "action": "shell",
      "if": "{{user_decision}} == \"YES\"",
      "run": "git checkout -b fix/sonarqube-issues-$(date +%Y%m%d%H%M%S)",
      "output_to": "branch_output"
    },
    {
      "action": "shell",
      "if": "{{user_decision}} == \"YES\"",
      "run": "git add .",
      "output_to": "git_add_output"
    },
    {
      "action": "shell",
      "if": "{{user_decision}} == \"YES\"",
      "run": "git commit -m \"fix: automated SonarQube issue resolution via Cline workflow\"",
      "output_to": "git_commit_output"
    },
    {
      "action": "shell",
      "if": "{{user_decision}} == \"YES\"",
      "run": "git push -u origin HEAD",
      "output_to": "git_push_output"
    }
 ]
}
