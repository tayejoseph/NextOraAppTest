# 🚀 GCP Deployment Checklist

## Pre-Deployment Checklist

### ✅ Local Testing

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Application builds: `npm run build`
- [ ] Docker builds successfully: `docker build -t test .`
- [ ] Application runs locally: `npm run dev`

### ✅ GCP Setup

- [ ] Google Cloud SDK installed: `gcloud version`
- [ ] GCP project created
- [ ] Billing enabled for the project
- [ ] Required APIs enabled (Cloud Run, Container Registry)
- [ ] Service account created with proper permissions
- [ ] Service account key generated

### ✅ GitHub Configuration

- [ ] Repository secrets configured:
  - [ ] `GCP_PROJECT_ID` - Your GCP project ID
  - [ ] `GCP_SA_KEY` - Service account key JSON (entire content)
- [ ] CI/CD workflow file present: `.github/workflows/ci-cd.yml`
- [ ] Repository has main branch protection (optional but recommended)

### ✅ Deployment Files

- [ ] `Dockerfile` - Container configuration
- [ ] `.dockerignore` - Build optimization
- [ ] `next.config.js` - Configured for standalone output
- [ ] Health endpoint: `app/api/health/route.ts`

## 🎯 Quick Setup Commands

### If Google Cloud SDK is not installed:

```bash
# macOS (Homebrew)
brew install google-cloud-sdk

# Alternative (direct installation)
curl https://sdk.cloud.google.com | bash
```

### Run automated setup:

```bash
# Make script executable
chmod +x scripts/gcp-setup.sh

# Run setup script
./scripts/gcp-setup.sh
```

### Test before deploying:

```bash
# Run tests
npm test

# Test Docker build
docker build -t nextjs-landing-page .

# Test container locally
docker run -p 3000:3000 nextjs-landing-page
```

## 🚀 Deploy to GCP

### Automatic Deployment (Recommended):

```bash
git add .
git commit -m "feat: deploy to GCP"
git push origin main
```

### Manual Deployment (if needed):

```bash
# Build and push image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/nextjs-landing-page

# Deploy to Cloud Run
gcloud run deploy nextjs-landing-page \
  --image gcr.io/YOUR_PROJECT_ID/nextjs-landing-page \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

## 📊 Monitoring Deployment

### GitHub Actions:

- Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
- Monitor pipeline progress: Test → Build → Deploy → Notify

### GCP Console:

- Cloud Run: `https://console.cloud.google.com/run`
- Container Registry: `https://console.cloud.google.com/gcr`
- Logs: `https://console.cloud.google.com/logs`

## 🛠️ Troubleshooting

### Common Issues & Solutions:

**❌ Tests Failing**

```bash
npm test
npm run lint
# Fix any issues before deploying
```

**❌ Docker Build Failing**

```bash
# Check Dockerfile syntax
docker build -t test .
# Review build logs for errors
```

**❌ Authentication Errors**

- Verify `GCP_SA_KEY` in GitHub secrets
- Ensure service account has required permissions
- Check project ID matches `GCP_PROJECT_ID` secret

**❌ Billing Not Enabled**

- Visit: `https://console.cloud.google.com/billing`
- Enable billing for your project

**❌ APIs Not Enabled**

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## 🎉 Success Indicators

### Deployment Successful When:

- ✅ All GitHub Actions jobs pass (green checkmarks)
- ✅ Cloud Run service shows "Receiving traffic"
- ✅ Application URL returns HTTP 200
- ✅ Health endpoint responds: `/api/health`

### Expected Timeline:

- **Setup**: 10-15 minutes (first time)
- **Deployment**: 5-8 minutes per deployment
- **Build Time**: 2-3 minutes
- **Deploy Time**: 1-2 minutes

## 📈 Post-Deployment

### Immediate Actions:

1. Test the deployed application URL
2. Verify health endpoint: `https://YOUR_APP_URL/api/health`
3. Monitor logs for any errors
4. Set up custom domain (optional)

### Ongoing Maintenance:

- Monitor usage and costs in GCP Console
- Review deployment logs regularly
- Update dependencies periodically
- Consider setting up staging environment

---

**Status**: Ready for deployment 🚀  
**Support**: Check `GCP-QUICK-START.md` for detailed setup instructions
