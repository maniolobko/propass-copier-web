# Guide de Déploiement PROPASS Copier Web sur Vercel

## 🚀 Déploiement Rapide (5 minutes)

### Étape 1: Créer un Repository GitHub
```bash
cd propass-copier-web
git init
git add .
git commit -m "Initial: PROPASS Copier Web"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/propass-copier-web.git
git push -u origin main
```

### Étape 2: Importer sur Vercel
1. Aller à **https://vercel.com/new**
2. Clicker **Continue with GitHub**
3. Sélectionner le repository `propass-copier-web`
4. Cliquer **Import**
5. Ne rien changer (Vercel détecte Vite automatiquement)
6. Cliquer **Deploy**

### Étape 3: Configurer l'API (Important ⚠️)
1. Attendre que le déploiement finisse
2. Aller à **Settings > Environment Variables**
3. Ajouter une nouvelle variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://votre-backend-api.com/api`
4. Cliquer **Add**
5. Redéployer (cliquer sur le dernier déploiement > Redeploy)

---

## 🎯 URLs Résultantes

Après déploiement:
- **URL de production**: https://propass-copier-web.vercel.app
- **Domaine personnalisé** (optionnel): https://your-domain.com

---

## 🛠️ Alternative: Déploiement via CLI (Avancé)

### Installation
```bash
npm install -g vercel
```

### Déploiement Preview
```bash
npm run deploy:preview
```

### Déploiement Production
```bash
npm run deploy
```

---

## 📋 Checklist de Déploiement

- [ ] Repository GitHub créé
- [ ] Code pushé sur main
- [ ] Vercel importé depuis GitHub
- [ ] Première déploiement réussi
- [ ] Variables d'env configurées (VITE_API_URL)
- [ ] Redéploiement après config d'env
- [ ] Tester l'application en production
- [ ] Configurer domaine personnalisé (optionnel)
- [ ] Configurer CORS sur la backend API

---

## 🔒 Configuration CORS Backend

Si votre backend est sur un domaine différent, ajouter au serveur Node.js:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',  // dev
    'http://localhost:5176',  // dev
    'https://propass-copier-web.vercel.app',  // production
    'https://your-domain.com'  // domaine personnel
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 📊 Monitoring et Logs

### Dashboard Vercel
1. Aller à **https://vercel.com/dashboard**
2. Sélectionner votre projet
3. Voir les déploiements en temps réel

### Logs de Build
1. Cliquer sur un déploiement
2. Aller à **Build Logs**
3. Voir toutes les étapes de build

### Logs Runtime
1. Cliquer sur un déploiement
2. Aller à **Logs**
3. Voir les erreurs en production

---

## 🔄 Redéploiement Automatique

Chaque push sur `main` déclenche automatiquement:
1. Install dépendances
2. Build (npm run build)
3. Déploiement en production

---

## ❌ Troubleshooting Courant

### Build échoue: "Module not found"
**Solution**: Verifier package.json a les bonnes dépendances
```bash
npm install
npm run build  # tester localement
```

### API ne répond pas en production
**Solution**: 
1. Vérifier VITE_API_URL dans Vercel Settings
2. Vérifier le backend est up et accessible
3. Vérifier CORS sur le backend

### Variables d'env ne fonctionnent pas
**Solution**:
1. Verifier le nom commence par `VITE_`
2. Redéployer après ajout de variables
3. Vérifier dans l'onglet Runtime Logs

---

## 📈 Performance

- **Build Time**: 4-8 secondes
- **Bundle Size**: 530KB (153KB gzippé)
- **Page Load**: <1000ms
- **Time to Interactive**: <2000ms

---

## 🎓 Ressources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

**🎉 Prêt? Lancez le déploiement!** 🚀
