# Webhook Structure Test

This document outlines the expected webhook payload structure for Canary deployment processing.

## Expected Vercel → GitHub → Canary Flow

1. **Vercel deploys** your PR branch
2. **GitHub receives deployment_status** from Vercel
3. **GitHub sends webhook** to Canary (if GitHub App installed)
4. **Canary processes webhook** using this structure:

```json
{
  "deployment_status": {
    "state": "success",
    "environment": "Preview", // NOT "Production"
    "environment_url": "https://portfolio-git-test-canary-webhook-[slug].vercel.app",
    "target_url": "https://portfolio-git-test-canary-webhook-[slug].vercel.app",
    "creator": {
      "login": "vercel[bot]"
    }
  },
  "deployment": {
    "id": 12345,
    "sha": "b483f34...",
    "production_environment": false
  },
  "repository": {
    "id": 67890,
    "full_name": "samkhur006/samkhur006.github.io",
    "owner": {
      "login": "samkhur006"
    },
    "name": "samkhur006.github.io"
  }
}
```

## Canary Processing Requirements

From the code analysis, Canary will process this webhook if:

- ✅ `deployment_status.state === "success"`
- ✅ `deployment_status.environment !== "Production"`
- ✅ `deployment.production_environment !== true`
- ✅ `deployment_status.environment_url` or `deployment_status.target_url` exists
- ✅ Provider detected as Vercel (`creator.login === "vercel[bot]"` OR URL ends with `.vercel.app`)
- ❓ Repository exists in Canary database
- ❓ PR associated with commit SHA exists

## Next Steps

To complete the integration:
1. Install Canary GitHub App on this repository
2. Add repository to Canary database
3. Test with new PR commit
