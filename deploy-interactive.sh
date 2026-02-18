#!/bin/bash

# 🚀 PROPASS Vercel Deployment Guide
# Chemin EXTRÊMEMENT SIMPLE en 2 minutes

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🚀 PROPASS Copier Web - Déploiement Vercel Ultra-Rapide║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Vérifications
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI pas trouvé. Installation..."
    npm install -g vercel
fi

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Pas de repository Git. Initialisation..."
    git init
    git config user.email "admin@propass.local"
    git config user.name "PROPASS"
    git add .
    git commit -m "Initial PROPASS Copier Web"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ÉTAPE 1️⃣  Authentification Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏳ Ouverture du navigateur pour authentification..."
echo "   (Connectez-vous avec GitHub, GitLab, or Bitbucket)"
echo ""

vercel login

echo ""
echo "✅ Authentification réussie!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ÉTAPE 2️⃣  Déploiement en Production"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

vercel --prod

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ DÉPLOIEMENT RÉUSSI!                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Votre application est en ligne!"
echo ""
echo "📊 Prochaines étapes:"
echo "   1. Configurez l'API: Vercel Settings > Environment Variables"
echo "   2. Ajoutez: VITE_API_URL = https://votre-api.com/api"
echo "   3. Redéployez (Deployments > Redeploy)"
echo ""
