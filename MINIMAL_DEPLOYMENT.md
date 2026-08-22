# 🎯 Minimal Deployment - Save Your Credits!

Maintenance note: refreshed on 2026-06-13.

## ❌ AVOID: Full Production Setup ($175/month)
- ❌ Firebase integration
- ❌ Full backend deployment  
- ❌ Database setup
- ❌ Auto-scaling infrastructure

## ✅ DO THIS INSTEAD: Minimal Cloud Run ($0-10/month)

### **What You Get:**
- ✅ Single API endpoint (`/predict`)
- ✅ AI/ML demo functionality
- ✅ HTTPS URL instantly
- ✅ Pay-per-use (almost free)
- ✅ No database needed
- ✅ No Firebase required

---

## 🚀 3-Step Deployment (10 minutes)

### **Step 1: Create Simple API** (2 minutes)
Create `index.js` file:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Single AI prediction endpoint
app.post('/predict', async (req, res) => {
  const { data } = req.body;
  
  // Mock AI prediction (replace with real ML model)
  const prediction = {
    status: 'success',
    prediction: Math.random() > 0.5 ? 'optimal' : 'needs_review',
    confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
    timestamp: new Date().toISOString(),
    input: data
  };
  
  res.json(prediction);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Step 2: Create package.json** (1 minute)
```json
{
  "name": "supply-chain-ai-demo",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^4.18.2"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

### **Step 3: Deploy to Cloud Run** (5 minutes)
```bash
# Install dependencies
npm install

# Deploy to Cloud Run
gcloud run deploy supply-chain-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 1
```

---

## 💰 Cost Breakdown (vs Full Production)

| Approach | Monthly Cost | Credits Used | Recommendation |
|----------|-------------|--------------|----------------|
| **Minimal Cloud Run** | $0-10 | 0-10 | ✅ **DO THIS** |
| Full Production | $175-195 | 175-195 | ❌ AVOID |

**Your Savings**: $165-195 per month!

---

## 🔗 Test Your API

After deployment, you'll get a URL like:
```
https://supply-chain-ai-a1b2c3d4e5.a.run.app
```

### **Test it:**
```bash
# Health check
curl https://your-url.a.run.app/health

# AI prediction
curl -X POST https://your-url.a.run.app/predict \
  -H "Content-Type: application/json" \
  -d '{"data": {"supply_level": 75, "demand": 120}}'
```

---

## 🎯 Why This Is Smart

### **Pros:**
- ✅ **Almost Free**: $0-10/month vs $175/month
- ✅ **Fast**: 10 minutes vs 2 hours
- ✅ **Simple**: No database, no Firebase, no complexity
- ✅ **Demo Ready**: Shows AI/ML capabilities
- ✅ **Scalable**: Can upgrade later if needed

### **Cons:**
- ❌ No persistent storage (OK for demo)
- ❌ Single endpoint (OK for demo)
- ❌ No user authentication (OK for demo)

---

## 🚀 Next Steps (After Demo Works)

### **Option 1: Keep Minimal** (Recommended for demo)
- Add more endpoints as needed
- Stay under $10/month
- Perfect for portfolio/showcase

### **Option 2: Upgrade Gradually** (Later, if needed)
- Add database ($30/month)
- Add authentication ($20/month)
- Still much cheaper than full setup

---

## 📞 Quick Commands

```bash
# Check deployment status
gcloud run services describe supply-chain-ai --region asia-south1

# View logs
gcloud logs read "resource.type=cloud_run_revision" --limit 50

# Update deployment
npm install
gcloud run deploy supply-chain-ai --source . --region asia-south1
```

---

## 🎉 Success!

You now have:
- ✅ Working AI API
- ✅ Professional URL
- ✅ $0-10 monthly cost
- ✅ Credits saved for other projects
- ✅ Demo ready in 10 minutes

**Total Time**: 10 minutes  
**Total Cost**: $0-10/month  
**Credits Saved**: 165-195/month

This is the SMART way to deploy your demo!
