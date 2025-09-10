# GCP Quick Start Guide

## 🚀 Deploy Your Next.js App to Google Cloud Platform

Your project is **ready for deployment** to GCP! Follow these simple steps:

### Step 1: Install Google Cloud SDK

```bash
# Option A: Using Homebrew (recommended for macOS)
brew install google-cloud-sdk

# Option B: Direct installation
curl https://sdk.cloud.google.com | bash
```

### Step 2: Run the Automated Setup Script

```bash
./scripts/gcp-setup.sh
```

This script will:

- ✅ Authenticate with Google Cloud
- ✅ Create your GCP project
- ✅ Enable required APIs (Cloud Run, Container Registry)
- ✅ Create service account for GitHub Actions
- ✅ Generate authentication keys
- ✅ Test your Docker setup

### Step 3: Configure GitHub Secrets

After running the setup script, add these secrets to your GitHub repository:

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

2. Add these secrets:
   - **`GCP_PROJECT_ID`**: Your project ID from Step 2
   - **`GCP_SA_KEY`**: Copy the entire content of `github-actions-key.json`

### Step 4: Deploy!

```bash
# Push to main branch to trigger deployment
git add .
git commit -m "feat: deploy to GCP"
git push origin main
```

## 📊 What Happens During Deployment

1. **Tests Run**: All 16 tests must pass
2. **Build**: Next.js app is built and containerized
3. **Deploy**: Container is deployed to Cloud Run
4. **Health Check**: Smoke tests verify deployment success

## 🔍 Monitor Your Deployment

- **GitHub Actions**: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
- **GCP Console**: `https://console.cloud.google.com/run`
- **Application URL**: Provided in deployment logs

## 💰 Cost Estimation

**Cloud Run Pricing** (Pay per use):

- First 2 million requests/month: **FREE**
- Beyond that: ~$0.40 per million requests
- Memory (512Mi): ~$0.000024 per GB-second
- CPU (1 vCPU): ~$0.00002400 per vCPU-second

**Expected monthly cost for typical usage**: **$0-5**

## 🛠️ Manual Setup (Alternative)

If you prefer manual setup, see detailed instructions in `CI-CD-SETUP.md`.

## 🆘 Troubleshooting

### Common Issues:

**1. "Tests Failed"**

```bash
npm test
npm run lint
```

**2. "Authentication Error"**

- Verify GitHub secrets are correct
- Check service account permissions

**3. "Billing Not Enabled"**

- Enable billing at: `https://console.cloud.google.com/billing`

**4. "API Not Enabled"**

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Configure your domain in Cloud Run
2. **Monitoring**: Set up Cloud Monitoring alerts
3. **SSL Certificate**: Automatic with custom domains
4. **CI/CD Improvements**: Add staging environment
5. **Performance**: Configure CDN with Cloud Storage

## 📞 Support

- **GCP Documentation**: https://cloud.google.com/run/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Status**: ✅ Ready for deployment
**Estimated Setup Time**: 10-15 minutes
**Deployment Time**: 5-8 minutes
