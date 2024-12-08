export const mockPreviews = {
  terminal: `$ wiz-cli deploy
Error: Version mismatch detected
Current version: 2.1.0
Required version: 3.0.0
Please upgrade your CLI to continue`,

  screen: `+------------------------+
|   Project Dashboard    |
+------------------------+
| Status: Deploy Failed  |
| Error: Version 2.1.0   |
| Required: 3.0.0       |
+------------------------+`,

  browser: `https://docs.wiz.io/cli/changelog
Version 3.0.0 (Latest)
- Breaking: New deployment workflow
- Breaking: Updated configuration format
- Added: Enhanced security features
- Fixed: Performance improvements`,

  logs: `[ERROR] 2023-10-15 14:23:45
Deploy failed: Version mismatch
[INFO] Common resolution steps:
1. Backup project files
2. Update CLI version
3. Migrate config files
4. Update dependencies`,

  metrics: `Performance Impact:
CPU Usage: 45% → 28%
Memory: 1.2GB → 800MB
Deploy Time: 45s → 30s
Success Rate: 99.9%`,

  knowledge: `Known Migration Issues:
1. Config format changes
2. New security requirements
3. Updated API endpoints
4. Breaking changes in v3.0.0`
};