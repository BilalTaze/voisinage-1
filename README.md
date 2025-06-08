
# VoisinAge - Plateforme d'entraide entre seniors et bénévoles

## À propos du projet

VoisinAge est une application web qui facilite l'entraide entre les seniors, les bénévoles et les familles. La plateforme permet de créer et de répondre à des demandes de services (courses, bricolage, compagnie, etc.) pour favoriser la solidarité de proximité.

## Technologies utilisées

Le projet est construit avec les technologies modernes suivantes:

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript** - Surcouche à JavaScript ajoutant le typage statique
- **Vite** - Outil de build rapide pour le développement moderne
- **React Router** - Gestion des routes et de la navigation
- **Tailwind CSS** - Framework CSS utilitaire pour un design responsive
- **Shadcn/UI** - Composants React accessibles et personnalisables
- **Lucide React** - Collection d'icônes SVG pour React
- **React Query** - Librairie pour la gestion des états serveur et la récupération de données
- **Local Storage** - Pour la persistance des données côté client

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/              # Composants UI de base (shadcn/ui)
│   └── services/        # Composants spécifiques aux services
├── hooks/               # Hooks React personnalisés
├── layout/              # Composants de mise en page
├── lib/                 # Fonctions utilitaires
├── pages/               # Pages de l'application
└── services/            # Services pour l'accès aux données
```

## Inventaire des composants

### Composants de mise en page
- **MainLayout** - Structure principale incluant Navbar et Footer
- **Navbar** - Barre de navigation avec gestion de l'authentification
- **Footer** - Pied de page avec liens et informations légales

### Composants de pages
- **Hero** - Section d'accueil avec CTA principale
- **HowItWorks** - Explication du fonctionnement de la plateforme
- **ServiceCategories** - Affichage des catégories de services
- **TestimonialsSection** - Témoignages d'utilisateurs
- **CTASection** - Appel à l'action pour l'inscription

### Composants de services
- **ServiceRequestCard** - Carte affichant une demande de service
- **ServiceRequestForm** - Formulaire pour créer une nouvelle demande

### Composants d'authentification
- **AuthLayout** - Mise en page pour les pages d'authentification
- **LoginForm** - Formulaire de connexion
- **RegisterForm** - Formulaire d'inscription

### Pages
- **Index** - Page d'accueil
- **Login** - Connexion
- **Register** - Inscription
- **Services** - Liste des services disponibles
- **NewService** - Création d'un nouveau service
- **Dashboard** - Tableau de bord de l'utilisateur
- **About** - À propos de VoisinAge
- **Contact** - Formulaire de contact
- **HowItWorks** - Page explicative détaillée
- **MentionsLegales** - Mentions légales
- **Confidentialite** - Politique de confidentialité
- **ConditionsUtilisation** - Conditions d'utilisation
- **NotFound** - Page 404

## Fonctionnalités

### Authentification
- Création de compte (senior, bénévole, famille)
- Connexion/déconnexion
- Stockage local des informations utilisateur

### Services
- Création de demandes de services
- Visualisation des services disponibles
- Filtrage des services par mot-clé
- Proposition d'aide pour les bénévoles
- Modification des demandes pour les seniors
- Gestion des statuts (disponible, assigné, terminé)

## Modèle de données

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  userType: "senior" | "volunteer" | "family";
  password: string;
}
```

### ServiceRequest
```typescript
interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: "open" | "assigned" | "completed";
  seniorId: string;
  volunteerId?: string;
}
```
## Démarrage du projet

Pour démarrer le projet localement, suivez ces étapes:

```sh
# Cloner le dépôt
git clone <URL_DU_DEPOT>

# Naviguer dans le répertoire du projet
cd voisinage

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```
