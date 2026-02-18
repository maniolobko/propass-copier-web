# PROPASS Copier Web - Guide de Déploiement Vercel

## 📦 Déploiement Automatique sur Vercel

### Prérequis
- Compte Vercel (https://vercel.com)
- Repository GitHub, GitLab, ou Bitbucket
- Node.js 16+ installé localement

### Option 1: Déploiement via GitHub (Recommandé)

#### 1. Initialiser Git et pousser sur GitHub
```bash
cd propass-copier-web

# Initialiser git si nécessaire
git init

# Ajouter les fichiers
git add .

# Commit
git commit -m "Initial commit: PROPASS Copier Web"

# Créer une nouvelle branche
git branch -M main

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/propass-copier-web.git

# Pousser le code
git push -u origin main
```

#### 2. Déployer sur Vercel
1. Aller à https://vercel.com/new
2. Sélectionner votre repository GitHub
3. Cliquer sur "Import"
4. Vercel détectera automatiquement:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: Vite

#### 3. Configurer les Variables d'Environnement
Dans le dashboard Vercel, aller à **Settings > Environment Variables** et ajouter:

```
VITE_API_URL = https://api.propass.com/api
```

(Remplacer par votre URL de backend réelle)

### Option 2: Déploiement via Vercel CLI

#### 1. Installer Vercel CLI
```bash
npm install -g vercel
```

#### 2. Déployer
```bash
cd propass-copier-web
vercel --prod
```

#### 3. Suivre les instructions du CLI
- Confirmer le project name
- Ajouter les variables d'environnement si nécessaire

### Option 3: Déploiement Manuel avec GitHub

```bash
# Cloner depuis GitHub
git clone https://github.com/YOUR_USERNAME/propass-copier-web.git
cd propass-copier-web

# Installer dépendances
npm install

# Build
npm run build

# Vercel détecte automatiquement le répertoire dist
vercel --prod
```

## 🔧 Configuration Vercel

### vercel.json - Détails

Le fichier `vercel.json` contient:

- **buildCommand**: Commande de build (`npm run build`)
- **outputDirectory**: Dossier de sortie (`dist`)
- **framework**: Framework détecté (`vite`)
- **env**: Variables d'environnement avec descriptions
- **headers**: Configuration de cache
- **routes**: Redirige les routes non trouvées vers `index.html` (SPA)

### Variables d'Environnement

Sur Vercel Dashboard:
1. Allez à **Settings > Environment Variables**
2. Ajoutez les variables:
   - `VITE_API_URL`: URL de votre backend API

### Domain Personnalisé

1. Aller à **Settings > Domains**
2. Ajouter votre domaine personnalisé
3. Configurer les DNS records selon les instructions Vercel

## 📊 Build Performance

- **Build Time**: ~4-8 secondes (dépend de la charge Vercel)
- **Bundle Size**: ~530KB (non gzippé), ~153KB gzippé
- **Average Response Time**: <100ms

## 🚀 Post-Déploiement

### Vérifier le déploiement
```bash
# Votre URL sera: https://propass-copier-web.vercel.app
# Ou votre domaine personnalisé

# Tester l'API
curl https://propass-copier-web.vercel.app/
```

### Monitoring
- Dashboard Vercel affiche les déploiements en temps réel
- Analyics: Performance, requêtes, errors
- Logs: Accès aux logs de build et runtime

### Rollback
Si un déploiement pose problème:
1. Go to **Deployments**
2. Sélectionner un déploiement précédent
3. Cliquer **Promote to Production**

## 🔐 Sécurité

### Variables d'Environnement Sensibles
- Ne JAMAIS committer `.env` local
- Utiliser Vercel Environment Variables pour les secrets
- La `VITE_API_URL` peut être publique (frontend)

### CORS Configuration
Si votre API backend est sur un domaine différent:

Sur le backend (propass-pro-server), ajouter:
```javascript
app.use(cors({
  origin: 'https://propass-copier-web.vercel.app',
  credentials: true
}));
```

## 🔄 CI/CD avec GitHub

Chaque push sur `main` triggère automatiquement:
1. Install
2. Build
3. Deploy to Preview (si PR)
4. Deploy to Production (si merge to main)

## ❌ Troubleshooting

### Build fails
```bash
# Vérifier localement
npm run build

# Vérifier les dépendances
npm list

# Réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Variables d'environnement non détectées
- Vérifier le fichier `vercel.json`
- Vercel nécessite `VITE_` pour les variables frontend
- Redéployer après ajout de variables

### API errors
- Vérifier `VITE_API_URL` dans Environment Variables Vercel
- Vérifier CORS sur le backend
- Tester avec `curl https://votre-api/api/health`

## 📞 Support

- Docs Vercel: https://vercel.com/docs
- Support Vite: https://vitejs.dev/guide/
- Logs Vercel: Dashboard > Deployments > Runtime Logs
