#!/bin/bash

# GCP Setup Script for Next.js Landing Page
# This script sets up your GCP project for deployment

set -e

echo "🚀 Starting GCP Setup for Next.js Landing Page"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI is not installed. Please install it first:"
    echo "brew install google-cloud-sdk"
    exit 1
fi

print_status "Google Cloud SDK is installed"

# Get project ID from user
read -p "Enter your desired GCP Project ID (e.g., my-nextjs-app-12345): " PROJECT_ID

if [[ -z "$PROJECT_ID" ]]; then
    print_error "Project ID is required"
    exit 1
fi

echo ""
echo "Setting up project: $PROJECT_ID"
echo "================================"

# Authenticate with Google Cloud
print_warning "Please authenticate with Google Cloud in the browser window that opens..."
gcloud auth login

# Create the project
print_status "Creating GCP project..."
gcloud projects create $PROJECT_ID --name="Next.js Landing Page" || {
    print_warning "Project might already exist, continuing..."
}

# Set the project as active
print_status "Setting active project..."
gcloud config set project $PROJECT_ID

# Enable billing (user needs to do this manually)
print_warning "IMPORTANT: You need to enable billing for this project in the GCP Console"
print_warning "Visit: https://console.cloud.google.com/billing/projects"
echo ""
read -p "Press Enter once you've enabled billing for the project..."

# Enable required APIs
print_status "Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com

print_status "APIs enabled successfully"

# Create service account
print_status "Creating service account for GitHub Actions..."
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions" \
    --description="Service account for GitHub Actions CI/CD" || {
    print_warning "Service account might already exist, continuing..."
}

# Grant necessary permissions
print_status "Granting permissions to service account..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Create and download service account key
print_status "Creating service account key..."
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

print_status "Service account key created: github-actions-key.json"

echo ""
echo "🎉 GCP Setup Complete!"
echo "===================="
echo ""
print_status "Project ID: $PROJECT_ID"
print_status "Service account: github-actions@$PROJECT_ID.iam.gserviceaccount.com"
print_status "Key file: github-actions-key.json"
echo ""

echo "📋 Next Steps:"
echo "============="
echo "1. Copy the content of github-actions-key.json:"
echo "   cat github-actions-key.json"
echo ""
echo "2. Add GitHub repository secrets:"
echo "   - Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
echo "   - Add GCP_PROJECT_ID: $PROJECT_ID"
echo "   - Add GCP_SA_KEY: (paste the entire content of github-actions-key.json)"
echo ""
echo "3. Push to main branch to trigger deployment"
echo ""

print_warning "IMPORTANT: Keep github-actions-key.json secure and never commit it to git!"
print_warning "Delete it after adding to GitHub secrets: rm github-actions-key.json"

echo ""
echo "🔗 Useful Links:"
echo "==============="
echo "• GCP Console: https://console.cloud.google.com/run?project=$PROJECT_ID"
echo "• GitHub Actions: https://github.com/YOUR_USERNAME/YOUR_REPO/actions"
echo "• Cloud Run Services: https://console.cloud.google.com/run?project=$PROJECT_ID"
echo ""

# Test the setup by building locally
print_status "Testing local Docker build..."
if docker build -t nextjs-landing-page-test . > /dev/null 2>&1; then
    print_status "Docker build test passed"
    docker rmi nextjs-landing-page-test > /dev/null 2>&1
else
    print_warning "Docker build test failed - check your Dockerfile"
fi

echo ""
print_status "Setup complete! Ready for deployment 🚀"
