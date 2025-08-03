#!/bin/bash

# UMKM Platform Setup Checker
echo "🔍 Checking UMKM Platform Setup..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js installed: $NODE_VERSION" 0
else
    print_status "Node.js not found" 1
    echo -e "${YELLOW}   Install from: https://nodejs.org/${NC}"
fi

# Check npm
echo -e "${BLUE}Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm installed: $NPM_VERSION" 0
else
    print_status "npm not found" 1
fi

# Check Git
echo -e "${BLUE}Checking Git...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_status "Git installed: $GIT_VERSION" 0
else
    print_status "Git not found" 1
    echo -e "${YELLOW}   Install from: https://git-scm.com/${NC}"
fi

# Check Docker (optional)
echo -e "${BLUE}Checking Docker (optional)...${NC}"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    print_status "Docker installed: $DOCKER_VERSION" 0
else
    print_status "Docker not found (optional)" 1
    echo -e "${YELLOW}   Install from: https://www.docker.com/products/docker-desktop/${NC}"
fi

# Check project files
echo -e "${BLUE}Checking project files...${NC}"

if [ -f "package.json" ]; then
    print_status "package.json found" 0
else
    print_status "package.json not found" 1
fi

if [ -f ".env" ]; then
    print_status ".env file found" 0
    
    # Check if .env has required variables
    if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
        if grep -q "your_supabase_project_url" .env; then
            print_status ".env needs Supabase configuration" 1
            echo -e "${YELLOW}   Please update .env with your Supabase credentials${NC}"
        else
            print_status ".env configured" 0
        fi
    else
        print_status ".env missing required variables" 1
    fi
else
    print_status ".env file not found" 1
    echo -e "${YELLOW}   Run: cp .env.example .env${NC}"
fi

if [ -d "node_modules" ]; then
    print_status "Dependencies installed" 0
else
    print_status "Dependencies not installed" 1
    echo -e "${YELLOW}   Run: npm install${NC}"
fi

# Check Supabase migrations
echo -e "${BLUE}Checking database migrations...${NC}"
if [ -f "supabase/migrations/20250708034004_lucky_flower.sql" ]; then
    print_status "Initial schema migration found" 0
else
    print_status "Initial schema migration not found" 1
fi

if [ -f "supabase/migrations/20250708034031_polished_disk.sql" ]; then
    print_status "Seed data migration found" 0
else
    print_status "Seed data migration not found" 1
fi

echo ""
echo -e "${BLUE}📋 Setup Summary:${NC}"
echo ""

# Check if ready to run
READY=true

if ! command -v node &> /dev/null; then
    READY=false
fi

if ! command -v npm &> /dev/null; then
    READY=false
fi

if [ ! -f ".env" ]; then
    READY=false
fi

if [ ! -d "node_modules" ]; then
    READY=false
fi

if [ "$READY" = true ]; then
    echo -e "${GREEN}🎉 Your setup looks good!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Make sure your .env file has correct Supabase credentials"
    echo "2. Run database migrations in Supabase dashboard"
    echo "3. Start development server: npm run dev"
    echo ""
else
    echo -e "${RED}⚠️  Setup incomplete. Please fix the issues above.${NC}"
    echo ""
    echo -e "${BLUE}Quick fix commands:${NC}"
    echo "• Copy environment file: cp .env.example .env"
    echo "• Install dependencies: npm install"
    echo "• Run setup script: npm run setup"
    echo ""
fi

echo -e "${BLUE}🚀 Ready to start? Run: npm run dev${NC}"