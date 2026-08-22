# Google Cloud Deployment Guide

Maintenance note: refreshed on 2026-06-13.

## Smart Supply Chain Platform - 300 Credits Setup

### 🚀 Quick Start (5 Steps)

#### 1. **Initialize Google Cloud Project**
```bash
# Install Google Cloud SDK
# Download from: https://cloud.google.com/sdk/docs/install

# Login and set up project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sql-component.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable redis.googleapis.com
```

#### 2. **Set Up Firebase Project**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (use existing project: supply-chain-demo-5d7cd)
firebase init

# Download service account key
# Go to: Firebase Console > Project Settings > Service Accounts
# Generate new private key and save as: backend/firebase_service_account.json
```

#### 3. **Set Up Databases**
```bash
# Create Cloud SQL PostgreSQL instance
gcloud sql instances create supply-chain-db \
    --database-version=POSTGRES_14 \
    --tier=db-g1-small \
    --region=us-central1 \
    --storage-size=20GB \
    --storage-type=SSD

# Create database
gcloud sql databases create supply_chain --instance=supply-chain-db

# Create Memorystore Redis instance
gcloud redis instances create supply-chain-redis \
    --size=1 \
    --region=us-central1 \
    --tier=standard
```

#### 4. **Deploy Applications**
```bash
# Deploy Frontend (React/Vite)
cd frontend
npm run build
gcloud app deploy

# Deploy Backend (FastAPI)
cd ../backend
gcloud app deploy
```

#### 5. **Verify Deployment**
```bash
# Check app status
gcloud app browse

# Check logs
gcloud app logs tail -s default
```

---

### 📋 Detailed Setup Instructions

#### **Prerequisites**
- Google Cloud SDK installed
- Node.js 18+ installed
- Python 3.11 installed
- Firebase CLI installed
- Git repository ready

#### **Project Structure Setup**
```
smart-supply-chain/
├── frontend/           # React/Vite app
├── backend/            # FastAPI app
├── gcp/               # GCP configurations
├── firebase/          # Firebase configs
└── scripts/           # Deployment scripts
```

#### **Environment Configuration**
1. Copy `backend/.env.example` to `backend/.env`
2. Update with your GCP project details
3. Set Firebase configuration in `firebase-config.js`

#### **Cost Optimization (300 Credits)**
- **App Engine**: F2 instances (~$40/month)
- **Cloud SQL**: db-g1-small (~$30/month)
- **Memorystore**: 1GB Redis (~$25/month)
- **Firebase**: Pay-as-you-go (~$20-40/month)
- **Cloud Build**: 120 build minutes/month free

**Total Estimated**: $115-135/month (well within 300 credits)

---

### 🔧 Configuration Files

The following files are automatically configured:
- `gcp/app.yaml` - Frontend App Engine config
- `gcp/backend.yaml` - Backend App Engine config
- `gcp/cloudbuild.yaml` - CI/CD pipeline
- `scripts/deploy.sh` - Deployment automation

---

### 🚨 Important Notes

1. **Firebase Integration**: Already configured with demo project
2. **Database Migration**: Need to migrate data to Cloud SQL
3. **Environment Variables**: Update for production
4. **SSL/TLS**: Automatically handled by App Engine
5. **Monitoring**: Set up Cloud Monitoring alerts

---

### 📞 Support & Troubleshooting

**Common Issues:**
- Build failures: Check `gcloud app logs tail`
- Database connection: Verify SQL instance status
- Firebase errors: Check service account key

**Useful Commands:**
```bash
# Check billing
gcloud billing accounts list

# Monitor usage
gcloud logging read "resource.type=app" --limit=50

# Scale instances
gcloud app instances resize --service=default --version=v1
```

---

### 🎯 Next Steps

1. **Deploy frontend** (5 minutes)
2. **Deploy backend** (5 minutes)
3. **Set up databases** (10 minutes)
4. **Configure monitoring** (5 minutes)
5. **Test all features** (10 minutes)

**Total Deployment Time**: ~35 minutes
