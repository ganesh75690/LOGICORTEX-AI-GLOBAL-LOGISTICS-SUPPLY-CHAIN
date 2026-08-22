#!/bin/bash

# Smart Supply Chain Platform - Google Cloud Deployment Script
# Usage: ./scripts/deploy.sh [frontend|backend|all]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if gcloud is installed
check_gcloud() {
    if ! command -v gcloud &> /dev/null; then
        print_error "Google Cloud SDK is not installed. Please install it first."
        exit 1
    fi
    print_success "Google Cloud SDK found"
}

# Check if user is logged in
check_auth() {
    if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -1 | grep -q "@"; then
        print_error "Not logged in to Google Cloud. Run 'gcloud auth login' first."
        exit 1
    fi
    print_success "Authenticated with Google Cloud"
}

# Set project
set_project() {
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    if [ -z "$PROJECT_ID" ]; then
        print_error "No project set. Run 'gcloud config set project YOUR_PROJECT_ID' first."
        exit 1
    fi
    print_success "Project set to: $PROJECT_ID"
}

# Enable required APIs
enable_apis() {
    print_status "Enabling required APIs..."
    gcloud services enable appengine.googleapis.com
    gcloud services enable cloudbuild.googleapis.com
    gcloud services enable run.googleapis.com
    gcloud services enable sql-component.googleapis.com
    gcloud services enable sqladmin.googleapis.com
    gcloud services enable redis.googleapis.com
    print_success "APIs enabled"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    npm ci
    npm run build
    print_success "Frontend built successfully"
}

# Deploy frontend
deploy_frontend() {
    print_status "Deploying frontend to App Engine..."
    gcloud app deploy gcp/app.yaml --quiet
    print_success "Frontend deployed successfully"
}

# Deploy backend
deploy_backend() {
    print_status "Deploying backend to App Engine..."
    cd backend
    gcloud app deploy ../gcp/backend.yaml --quiet
    cd ..
    print_success "Backend deployed successfully"
}

# Main deployment function
deploy() {
    local component=${1:-"all"}
    
    print_status "Starting deployment of $component..."
    
    case $component in
        "frontend")
            build_frontend
            deploy_frontend
            ;;
        "backend")
            deploy_backend
            ;;
        "all")
            build_frontend
            deploy_frontend
            deploy_backend
            ;;
        *)
            print_error "Invalid component. Use: frontend, backend, or all"
            exit 1
            ;;
    esac
}

# Get deployment status
get_status() {
    print_status "Getting deployment status..."
    gcloud app describe
    gcloud app instances list
}

# View logs
view_logs() {
    local service=${1:-"default"}
    print_status "Viewing logs for service: $service"
    gcloud app logs tail -s $service
}

# Main script execution
main() {
    print_status "Smart Supply Chain Platform - Google Cloud Deployment"
    echo "=================================================="
    
    check_gcloud
    check_auth
    set_project
    enable_apis
    
    case ${1:-"deploy"} in
        "deploy")
            deploy ${2:-"all"}
            ;;
        "status")
            get_status
            ;;
        "logs")
            view_logs ${2:-"default"}
            ;;
        "help")
            echo "Usage: $0 [command] [options]"
            echo "Commands:"
            echo "  deploy [frontend|backend|all]  - Deploy components"
            echo "  status                          - Get deployment status"
            echo "  logs [service]                  - View logs"
            echo "  help                            - Show this help"
            ;;
        *)
            print_error "Unknown command: $1"
            echo "Run '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
