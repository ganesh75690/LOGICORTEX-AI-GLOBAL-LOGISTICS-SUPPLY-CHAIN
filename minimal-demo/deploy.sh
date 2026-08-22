#!/bin/bash

# Smart Supply Chain AI Demo - One-Click Deployment
# Cost: $0-10/month (vs $175/month full setup)

echo "🚀 Smart Supply Chain AI Demo Deployment"
echo "=========================================="
echo "💰 Cost: $0-10/month (saving $165/month!)"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK not installed"
    echo "📥 Download from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not installed"
    echo "📥 Download Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Tools verified"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Deploy to Cloud Run
echo ""
echo "🚀 Deploying to Cloud Run..."
echo "📍 Region: asia-south1 (Mumbai)"
echo "💾 Memory: 256Mi"
echo "🖥️  CPU: 1"
echo "📊 Max instances: 1"
echo ""

gcloud run deploy supply-chain-ai \
    --source . \
    --region asia-south1 \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --max-instances 1

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "🔗 Your API is live at:"
    echo "https://supply-chain-ai-xxxxx.a.run.app"
    echo ""
    echo "🧪 Test commands:"
    echo "curl https://your-url.a.run.app/health"
    echo "curl -X POST https://your-url.a.run.app/predict -H 'Content-Type: application/json' -d '{\"data\": {\"inventory\": 500}}'"
    echo ""
    echo "💰 Monthly cost: $0-10"
    echo "💸 Credits saved: $165-195/month"
else
    echo ""
    echo "❌ Deployment failed"
    echo "🔧 Check: gcloud logs read 'resource.type=cloud_run_revision' --limit 20"
fi
