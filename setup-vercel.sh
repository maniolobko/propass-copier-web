#!/bin/bash

# PROPASS - Configuration Vercel Automatisée
# Ceci prépare tout pour un déploiement facile

set -e

PROJECT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="propass-copier-web"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     🚀 PROPASS DEPLOYMENT - AUTOMATIC GITHUB + VERCEL SETUP   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Étape 1: Vérifier Git
echo "📋 Étape 1: Vérification Git..."
if [ ! -d .git ]; then
    echo "   ⚙️  Initialisation de Git..."
    git init
    git config user.email "admin@propass.local"
    git config user.name "PROPASS Admin"
fi

if git status | grep -q "nothing to commit"; then
    echo "   ✅ Repository Git OK"
else
    echo "   ⚙️  Commit des fichiers..."
    git add .
    git commit -m "🚀 PROPASS Copier Web - Ready for Vercel"
fi
echo ""

# Étape 2: Résumé
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ PRÊT POUR VERCEL!                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📦 Projet: $PROJECT_NAME"
echo "📍 Chemin: $PROJECT_PATH"
echo "🔧 Framework: Vite + React + TypeScript"
echo "📊 Build Output: dist/"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "MAINTENANT, CHOISISSEZ VOTRE MÉTHODE DE DÉPLOIEMENT:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "  OPTION 1: Via GitHub + Vercel Web UI (RECOMMANDÉ - Super facile) ⭐"
echo "  ──────────────────────────────────────────────────────────────"
echo "  1. Aller à: https://github.com/new"
echo "  2. Créer repo: 'propass-copier-web'"
echo "  3. Suivre les commandes GitHub (push le code)"
echo "  4. Aller à: https://vercel.com/new"
echo "  5. Importer votre repo"
echo "  6. Cliquer 'Deploy' ✨"
echo ""
echo "  Total: ~2 minutes"
echo ""

echo "  OPTION 2: Via Vercel CLI (Commandline)"
echo "  ────────────────────────────────────────"
echo "  1. Taper: vercel login"
echo "  2. Taper: vercel --prod"
echo "  3. Suivre les prompts"
echo ""
echo "  Total: ~1 minute (mais nécessite CLI)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 CHOIX RECOMMANDÉ: OPTION 1 (GitHub + Web UI)"
echo "   → Plus facile (interface visuelle)"
echo "   → Mieux pour partager/collaborer"
echo "   → Déploiement automatique à chaque push"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🔗 COMMANDES GITHUB (à copier après avoir créé le repo):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  git remote add origin https://github.com/VOTRE_USERNAME/propass-copier-web.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""

echo "✨ Après le push:"
echo "   1. Aller à: https://vercel.com/new"
echo "   2. Cliquer 'Import Git Repository'"
echo "   3. Chercher 'propass-copier-web'"
echo "   4. Cliquer 'Deploy'"
echo ""
