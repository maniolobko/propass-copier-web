# PROPASS - Copie de Badges

Application web moderne pour la copie de badges RFID avec interface professionnelle.

## 🎯 Fonctionnalités

- **Dashboard Intuitif**: Affichage du quota de copie avec graphique donut
- **Copie de Badges**: Processus en 2 étapes (connexion lecteur + placement badge)
- **Navigation Fluide**: Sidebar fixe avec navigation entre pages
- **Status Lecteur**: Affichage du statut de connexion du lecteur ACR122U
- **Gestion de Quota**: Suivi de l'utilisation mensuelle des badges
- **Notifications**: Feedback utilisateur avec toast notifications
- **Design Responsive**: Interface adaptée aux mobiles et tablettes

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Builder pour la production
npm run build

# Prévisualiser la build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── main.tsx              # Point d'entrée
├── App.tsx              # Composant principal
├── index.css            # Styles globaux
├── components/
│   └── Sidebar.tsx      # Barre latérale de navigation
├── pages/
│   ├── Dashboard.tsx    # Page d'accueil
│   └── CopyBadge.tsx    # Page de copie de badge
└── types/
    └── index.ts        # Définitions TypeScript
```

## 🎨 Technologies

- **React 18**: Framework UI
- **TypeScript**: Typage statique
- **Vite**: Build tool
- **Tailwind CSS**: Framework CSS
- **Recharts**: Visualisation de données
- **Lucide React**: Icônes
- **React Hot Toast**: Notifications

## 📝 Notes

Cette application est une nouvelle interface web complètement indépendante de l'application Electron précédente. Elle peut fonctionner en standalone ou être intégrée à un backend API.

## 🔌 API Integration

Pour intégrer avec un backend:

1. Configurer les endpoints API dans `src/config.ts` (à créer)
2. Utiliser des hooks `useFetch` pour les appels API
3. Gérer l'authentification via tokens

## 📞 Support

Pour plus d'informations, consultez la documentation du projet PROPASS.
