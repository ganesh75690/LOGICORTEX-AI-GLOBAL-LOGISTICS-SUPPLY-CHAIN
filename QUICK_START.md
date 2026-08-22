# 🚀 Quick Start: Deploy to Google Cloud

Maintenance note: refreshed on 2026-06-13.

## You have 300 credits and 90-day free trial - Let's deploy!

### **Step 1: Install Required Tools** (5 minutes)
```bash
# Install Google Cloud SDK
# Download: https://cloud.google.com/sdk/docs/install

# Install Node.js (if not installed)
# Download: https://nodejs.org/

# Install Firebase CLI
npm install -g firebase-tools
```

### **Step 2: Setup Google Cloud** (3 minutes)
```bash
# Login to Google Cloud
gcloud auth login

# Create/select your project
gcloud config set project YOUR_PROJECT_ID

# Verify billing is enabled
gcloud billing accounts list
```

### **Step 3: One-Click Deployment** (10 minutes)
```bash
# Make deploy script executable
chmod +x scripts/deploy.sh

# Deploy everything
./scripts/deploy.sh all
```

### **Step 4: Verify Deployment** (2 minutes)
```bash
# Check deployment status
./scripts/deploy.sh status

# View your app
gcloud app browse
```

---

## 🎯 What Gets Deployed

✅ **Frontend** (React/Vite) - App Engine  
✅ **Backend** (FastAPI/Python) - App Engine  
✅ **Firebase Integration** - Real-time features  
✅ **Auto-scaling** - Handles traffic spikes  
✅ **SSL/TLS** - Secure connections  
✅ **Monitoring** - Built-in health checks  

---

## 💰 Cost Breakdown (300 Credits)

| Service | Monthly Cost | Credits Used |
|---------|-------------|--------------|
| App Engine (Frontend) | ~$40 | 40 |
| App Engine (Backend) | ~$60 | 60 |
| Cloud SQL (PostgreSQL) | ~$30 | 30 |
| Memorystore (Redis) | ~$25 | 25 |
| Firebase (Pay-as-you-go) | ~$20-40 | 20-40 |
| **Total** | **~$175-195** | **175-195** |

**Remaining Credits**: ~105-125 for additional services

---

## 🔧 After Deployment

### **Required Actions:**
1. **Update Environment Variables**
   ```bash
   # Edit backend configuration
   # Replace YOUR_PROJECT_ID in gcp/app.yaml and gcp/backend.yaml
   ```

2. **Set Up Databases**
   ```bash
   # Create Cloud SQL instance
   gcloud sql instances create supply-chain-db --database-version=POSTGRES_14
   
   # Create Redis instance
   gcloud redis instances create supply-chain-redis --size=1
   ```

3. **Configure Firebase**
   ```bash
   # Download service account key
   # Firebase Console > Project Settings > Service Accounts
   ```

---

## 📱 Access Your Application

After deployment, your app will be available at:
- **Frontend**: `https://YOUR_PROJECT_ID.appspot.com`
- **Backend API**: `https://backend-dot-YOUR_PROJECT_ID.appspot.com`
- **Admin Console**: `https://YOUR_PROJECT_ID.appspot.com/admin`

---

## 🆘 Need Help?

**Common Issues:**
- **Build fails**: Check logs with `./scripts/deploy.sh logs`
- **Database connection**: Verify Cloud SQL instance status
- **Firebase errors**: Check service account key path

**Useful Commands:**
```bash
# View deployment logs
./scripts/deploy.sh logs

# Check app status
./scripts/deploy.sh status

# Redeploy specific component
./scripts/deploy.sh frontend
./scripts/deploy.sh backend
```

---

## 🎉 Congratulations!

Your Smart Supply Chain Platform is now live on Google Cloud with:
- **99.99% uptime** SLA
- **Auto-scaling** infrastructure  
- **Global CDN** for fast loading
- **Real-time features** via Firebase
- **Secure** by default

**Next Steps:**
1. Test all features
2. Set up monitoring alerts
3. Configure custom domain
4. Set up backup strategies

**Total Deployment Time**: ~20 minutes
