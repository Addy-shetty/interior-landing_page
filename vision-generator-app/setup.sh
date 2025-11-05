#!/bin/bash

# Ekaara Vision Generator - Quick Setup Script

echo "🎨 Setting up Ekaara Designs Vision Generator..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from vision-generator-app directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your Gemini API key!"
    echo "   Get your key at: https://makersuite.google.com/app/apikey"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Edit .env and add your VITE_GEMINI_API_KEY"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
