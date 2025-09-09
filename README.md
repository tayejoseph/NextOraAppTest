# NextJS Landing Page

A modern, responsive landing page built with Next.js, TypeScript, and comprehensive testing. This project is designed for easy CI/CD deployment to Google Cloud Platform.

## 🚀 Features

- **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **TypeScript**: Full type safety and better developer experience
- **Comprehensive Testing**: Jest and React Testing Library for robust test coverage
- **Docker Ready**: Containerized for easy deployment
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions
- **GCP Deployment**: Ready for Google Cloud Platform deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with custom properties
- **Testing**: Jest + React Testing Library
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: Google Cloud Platform (Cloud Run)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd nextjs-landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

This project includes comprehensive tests for all components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The test suite covers:

- ✅ Hero component functionality and interactions
- ✅ Features component rendering and content
- ✅ Footer component display
- ✅ Page component integration
- ✅ User interactions and state changes
- ✅ CSS class assignments
- ✅ Component ordering and structure

## 🐳 Docker

### Build the Docker image

```bash
docker build -t nextjs-landing-page .
```

### Run the container

```bash
docker run -p 3000:3000 nextjs-landing-page
```

## 🚀 Deployment to Google Cloud Platform

### Prerequisites

1. **Google Cloud Project**: Create a new project in the [GCP Console](https://console.cloud.google.com/)
2. **Service Account**: Create a service account with the following roles:
   - Cloud Run Admin
   - Storage Admin
   - Cloud Build Editor
3. **APIs**: Enable the following APIs:
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

### Method 1: GitHub Actions (Recommended)

1. **Set up GitHub Secrets**:

   - `GCP_PROJECT_ID`: Your Google Cloud Project ID
   - `GCP_SA_KEY`: Service account key (JSON format)

2. **Push to main branch**: The CI/CD pipeline will automatically:
   - Run tests
   - Build Docker image
   - Deploy to Cloud Run

### Method 2: Manual Deployment

1. **Build and push to Container Registry**:

   ```bash
   # Configure Docker for GCR
   gcloud auth configure-docker

   # Build and tag
   docker build -t gcr.io/PROJECT_ID/nextjs-landing-page .
   docker push gcr.io/PROJECT_ID/nextjs-landing-page
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy nextjs-landing-page \
     --image gcr.io/PROJECT_ID/nextjs-landing-page \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Method 3: Cloud Build

1. **Submit build**:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

### GCP Configuration

The project includes multiple deployment configurations:

- **`cloudbuild.yaml`**: For Cloud Build deployments
- **`app.yaml`**: For App Engine deployments
- **`.github/workflows/ci-cd.yml`**: For GitHub Actions CI/CD

## 📁 Project Structure

```
nextjs-landing-page/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   └── Footer.tsx        # Footer component
├── __tests__/            # Test files
│   ├── Hero.test.tsx
│   ├── Features.test.tsx
│   ├── Footer.test.tsx
│   └── page.test.tsx
├── .github/workflows/     # GitHub Actions
│   └── ci-cd.yml
├── Dockerfile            # Docker configuration
├── cloudbuild.yaml       # Cloud Build configuration
├── app.yaml             # App Engine configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🔍 Monitoring and Health Checks

The deployed application includes:

- Health check endpoint at the root URL
- Automatic scaling based on CPU utilization
- Cloud Run metrics and logging
- Error tracking and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-username/nextjs-landing-page/issues) page
2. Create a new issue with detailed information
3. Check the deployment logs in Google Cloud Console

## 🎉 Success!

Once deployed, your landing page will be available at:

- **Cloud Run URL**: `https://nextjs-landing-page-xxxxx-uc.a.run.app`
- **Custom Domain**: Configure in Cloud Run settings

The application is now ready for production use with automatic scaling, monitoring, and CI/CD pipeline! 🚀
# NextOraAppTest
