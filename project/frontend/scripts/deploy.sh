#!/bin/bash

# UMKM Platform Deployment Script
echo "🚀 Deploying UMKM Platform..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create one from .env.example"
    exit 1
fi

# Build and start production containers
echo "🏗️  Building production containers..."
docker-compose -f docker-compose.yml up --build -d

# Check if containers are running
echo "🔍 Checking container status..."
docker-compose ps

echo "✅ Deployment completed!"
echo "🌐 Application is running at http://localhost:3000"