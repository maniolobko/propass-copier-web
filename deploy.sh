#!/bin/bash

# PROPASS Copier Web - Script de Déploiement Vercel
# Usage: ./deploy.sh [production|preview]

set -e

ENVIRONMENT=${1:-preview}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 PROPASS Copier Web - Déploiement Vercel"
echo "==========================================="
echo ""

# Vérifier les prérequis
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Node.js $(node --version) détecté"
echo "✅ npm $(npm --version) détecté"
echo ""

# Installer Vercel CLI si nécessaire
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installé"
else
    echo "✅ Vercel CLI détecté: $(vercel --version)"
fi
echo ""

# Nettoyer les fichiers de build précédents
echo "🧹 Nettoyage des fichiers de build..."
rm -rf "$PROJECT_DIR/dist"
echo "✅ Build directory nettoyé"
echo ""

# Installer les dépendances
echo "📥 Installation des dépendances..."
cd "$PROJECT_DIR"
npm install
echo "✅ Dépendances installées"
echo ""

# Build
echo "🔨 Build du projet..."
npm run build
echo "✅ Build réussi"
echo ""

# Déploiement
echo "📤 Déploiement sur Vercel..."
if [ "$ENVIRONMENT" = "production" ] || [ "$ENVIRONMENT" = "prod" ]; then
    echo "🎯 Mode: PRODUCTION"
    vercel --prod
else
    echo "🎯 Mode: PREVIEW"
    vercel
fi

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "📊 Pour monitorer votre déploiement:"
echo "   → Dashboard: https://vercel.com/dashboard"
echo "   → Logs: Allez à Settings > Deployments"
echo ""
