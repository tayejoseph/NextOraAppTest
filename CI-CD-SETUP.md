# CI/CD Pipeline Setup for Next.js Landing Page

This project uses GitHub Actions to automatically test and deploy to Google Cloud Platform (GCP) Cloud Run.

## Pipeline Overview

The CI/CD pipeline consists of 4 jobs that run sequentially:

1. **Test** - Runs linting and unit tests with coverage
2. **Build** - Builds the Next.js application and creates artifacts
3. **Deploy** - Deploys to GCP Cloud Run (only on main branch pushes)
4. **Notify** - Provides deployment status notifications

## Pipeline Triggers

- **Pull Requests**: Runs test and build jobs only
- **Push to main branch**: Runs all jobs including deployment
- **Push to develop branch**: Runs test and build jobs only

## Test Failure Behavior

If tests fail:

- The pipeline stops immediately
- Build job will not run
- Deployment will not occur
- Pull request status checks will fail

## GCP Setup Requirements

### 1. Create a Google Cloud Project

```bash
# Create a new project (replace PROJECT_ID with your desired ID)
gcloud projects create PROJECT_ID
gcloud config set project PROJECT_ID
```

### 2. Enable Required APIs

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com

# Enable Cloud Build API (optional, for advanced builds)
gcloud services enable cloudbuild.googleapis.com
```

### 3. Create a Service Account

```bash
# Create service account for GitHub Actions
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions"

# Get your project ID
export PROJECT_ID=$(gcloud config get-value project)

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
```

### 4. Generate Service Account Key

```bash
# Create and download service account key
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

# Display the key content (copy this for GitHub secrets)
cat github-actions-key.json
```

## GitHub Repository Setup

### 1. Required Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

| Secret Name      | Description                               | Example Value                     |
| ---------------- | ----------------------------------------- | --------------------------------- |
| `GCP_PROJECT_ID` | Your Google Cloud Project ID              | `my-nextjs-project`               |
| `GCP_SA_KEY`     | Service account key JSON (entire content) | `{"type": "service_account",...}` |

### 2. Environment Protection Rules (Optional)

For additional security, set up environment protection rules:

1. Go to Settings → Environments
2. Create a "production" environment
3. Add protection rules:
   - Required reviewers
   - Wait timer
   - Deployment branches (restrict to main)

## Pipeline Configuration

The pipeline is configured in `.github/workflows/ci-cd.yml` with the following settings:

- **Node.js Version**: 18
- **GCP Region**: us-central1
- **Service Name**: nextjs-landing-page
- **Memory**: 512Mi
- **CPU**: 1 vCPU
- **Port**: 3000

### Customizing the Pipeline

To modify the deployment configuration, update the environment variables in the workflow file:

```yaml
env:
  NODE_VERSION: "18"
  GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  GCP_SERVICE_NAME: nextjs-landing-page # Change this
  GCP_REGION: us-central1 # Change this
```

## Docker Configuration

The project includes:

- **Dockerfile**: Multi-stage build for optimized production image
- **.dockerignore**: Excludes unnecessary files from Docker context
- **next.config.js**: Configured for standalone output mode

## Local Testing

### Test the Docker Build Locally

```bash
# Build the Docker image
docker build -t nextjs-landing-page .

# Run the container locally
docker run -p 3000:3000 nextjs-landing-page

# Test the application
curl http://localhost:3000
```

### Run Tests Locally

```bash
# Install dependencies
npm install

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Build the application
npm run build
```

## Monitoring and Troubleshooting

### View Deployment Logs

```bash
# View Cloud Run service logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=nextjs-landing-page" --limit=50 --format="table(timestamp,textPayload)"
```

### Common Issues

1. **Authentication Errors**

   - Verify service account key is correctly added to GitHub secrets
   - Ensure service account has required permissions

2. **Build Failures**

   - Check that tests pass locally
   - Verify all dependencies are in package.json

3. **Deployment Failures**
   - Verify GCP project ID is correct
   - Ensure APIs are enabled
   - Check Cloud Run service limits

### Pipeline Status

- ✅ **Success**: Tests pass → Build succeeds → Deployment completes
- ❌ **Failure**: Pipeline stops at first failure point
- 🔄 **In Progress**: Check Actions tab for real-time status

## Security Considerations

- Service account follows principle of least privilege
- Secrets are stored in GitHub repository secrets
- Production environment requires approval (if configured)
- Docker image runs as non-root user
- HTTPS enforced on Cloud Run

## Cost Optimization

- Cloud Run only charges for actual usage
- Container images are cached in Container Registry
- Build artifacts have 1-day retention
- Consider using Cloud Build for larger projects

## Next Steps

1. Set up monitoring and alerting
2. Configure custom domain
3. Add health checks
4. Implement blue-green deployments
5. Set up staging environment
