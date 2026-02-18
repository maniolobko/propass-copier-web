#!/bin/bash

# PROPASS Copier Web - Script de démarrage

cd "$(dirname "$0")"

echo "🚀 Démarrage de PROPASS Copier Web..."

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'application
echo "🔥 Lancement du serveur de développement..."
npm run dev
