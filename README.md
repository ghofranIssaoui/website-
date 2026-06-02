# SmartRecruitAI Landing Page

Site vitrine pour SmartRecruitAI par 3LMSolutions.

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
cd website
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

### 3. Ouvrir dans le navigateur

```
http://localhost:3000
```

## 📁 Structure du projet

```
website/
├── public/
│   └── images/          # Images du site
├── src/
│   ├── app/
│   │   ├── globals.css  # Styles globaux + animations 3D
│   │   ├── layout.tsx   # Layout principal
│   │   └── page.tsx     # Page d'accueil
│   └── components/
│       ├── Hero.tsx     # Section héro avec phone 3D
│       ├── Features.tsx # Fonctionnalités
│       ├── HowItWorks.tsx # Comment ça marche
│       ├── Contact.tsx  # Section contact
│       └── Footer.tsx   # Pied de page
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## ✨ Fonctionnalités

- 🎨 Design sombre moderne (matching avec l'app)
- 📱 3D Phone Mockup avec aperçu de l'app
- 🌊 Animations fluides
- 📱 100% Responsive
- 🇫🇷 Interface en Français
- 🔗 Bouton "Se Connecter" → Ouvre l'app mobile

## 🎨 Technologies

- **Next.js 14** - Framework React
- **Tailwind CSS** - Styling
- **TypeScript** - Typage
- **Framer Motion** - Animations (optionnel)

## 📱 Connexion à l'App Mobile

Le bouton "Se Connecter" dans le Hero ouvre l'app mobile via deep link:

```typescript
const appLink = "smartrecruitai://";
```

Modifiez ce lien selon votre configuration d'app.

## 🚢 Déploiement (optionnel)

### Vercel (recommandé)

```bash
npm install -g vercel
vercel
```

### Autre hébergeur

```bash
npm run build
# Déployez le dossier .next sur votre hébergeur
```

## 📞 Contact

- **3LMSolutions**
- Phone: +216 56 566 533
- Email: contact@3lmsolutions.net
- Site: https://3lm-solutions2.odoo.com/

---

© {new Date().getFullYear()} 3LMSolutions. Tous droits réservés.
