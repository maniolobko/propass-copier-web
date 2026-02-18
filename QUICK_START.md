# 🚀 Déploiement Vercel - Guide Ultra-Rapide

## ⚡ 3 ÉTAPES (5 minutes max)

### Étape 1: Créer un repo GitHub
1. Aller à **https://github.com/new**
2. Nom: `propass-copier-web`
3. Cliquer **Create repository**
4. ✅ Ne pas créer de README

### Étape 2: Pousser le code GitHub
Copier-coller dans le terminal:
```bash
cd "/Users/mohamadousissoko/DJOUGOO APP/propass-copier-web"
git remote add origin https://github.com/VOTRE_USERNAME/propass-copier-web.git
git branch -M main
git push -u origin main
```

(Remplacer `VOTRE_USERNAME` par votre username GitHub)

### Étape 3: Déployer sur Vercel
1. Aller à **https://vercel.com/new**
2. Cliquer **Continue with GitHub**
3. Chercher `propass-copier-web`
4. Cliquer **Import**
5. Laisser les settings par défaut
6. Cliquer **Deploy**

## ✨ C'est fait!

Votre application est en ligne à `propass-copier-web.vercel.app` 🎉

### Configurer l'API (Important)
1. Sur Vercel, aller à **Settings > Environment Variables**
2. Ajouter une variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://votre-api-backend.com/api`
3. Cliquer **Add**
4. Allez à **Deployments** et cliquer le dernier deployment
5. Cliquer **Redeploy**

## 🎯 Alternative: Via Vercel CLI
```bash
cd "/Users/mohamadousissoko/DJOUGOO APP/propass-copier-web"
vercel login
vercel --prod
```

Puis suivre les prompts.

---

✅ Tout est prêt! Il ne vous manque que l'authentification GitHub/Vercel.
