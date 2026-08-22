# 🚀 Deploy Now - 3 Commands Only!

## 📁 Go to minimal-demo folder
```bash
cd minimal-demo
```

## 🔧 Install dependencies
```bash
npm install
```

## 🚀 Deploy to Cloud Run
```bash
gcloud run deploy supply-chain-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 1
```

---

## ✅ That's It! 

**Your API will be live at:**
```
https://supply-chain-ai-xxxxx.a.run.app
```

---

## 🧪 Test Your API

### **Health Check:**
```bash
curl https://your-url.a.run.app/health
```

### **AI Prediction:**
```bash
curl -X POST https://your-url.a.run.app/predict \
  -H "Content-Type: application/json" \
  -d '{"data": {"current_inventory": 500, "demand_forecast": 750}}'
```

### **API Info:**
```bash
curl https://your-url.a.run.app/
```

---

## 💰 Cost: $0-10/month

**You're saving $165-195/month!** 🎉

---

## 🆘 If Something Goes Wrong

### **Check deployment status:**
```bash
gcloud run services describe supply-chain-ai --region asia-south1
```

### **View logs:**
```bash
gcloud logs read "resource.type=cloud_run_revision" --limit 20
```

### **Redeploy (if needed):**
```bash
gcloud run deploy supply-chain-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## 🎯 What You Get

✅ **Working AI API** - Supply chain predictions  
✅ **Professional URL** - HTTPS enabled  
✅ **Almost Free** - $0-10/month  
✅ **Demo Ready** - Show to anyone  
✅ **Credits Saved** - 165-195/month  

**Total Time**: 5 minutes  
**Total Cost**: Almost free  
**Result**: Professional AI demo!
