#!/bin/bash

# UMKM Platform Local Setup Script
echo "🚀 Setting up UMKM Platform for Local Development..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "📥 Please download and install Node.js from: https://nodejs.org/"
    echo "   Choose the LTS (Long Term Support) version"
    exit 1
else
    echo "✅ Node.js found: $(node --version)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "📥 npm should come with Node.js. Please reinstall Node.js"
    exit 1
else
    echo "✅ npm found: $(npm --version)"
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed."
    echo "📥 Please download and install Git from: https://git-scm.com/"
    exit 1
else
    echo "✅ Git found: $(git --version)"
fi

echo ""
echo "📋 Setting up project files..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    echo "🔧 Try running: npm cache clean --force && npm install"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Make scripts executable
chmod +x scripts/*.sh

echo ""
echo "🎉 Local setup completed successfully!"
echo ""