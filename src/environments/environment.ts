// Fichier d'environnement

export const environment = {
// Indicateur de mode production/développement
 production: false,
  // URL de base de l'API
  apiUrl: 'http://localhost:8080/api/v1/',
  // Nom de l'application
  appName: 'CRUD ANGULAR-CODEIGNITER',
  // Acronyme de l'application
  appAcronym: 'CIA-SECURE',
  // Chemin vers le logo de l'application
  appLogo: 'assets/images/logo.png',
  // Configuration du fil d'Ariane (breadcrumbs)
  breadcrum: {
    // Activation ou désactivation du fil d'Ariane
    enabled: true,
    // Stratégie par défaut pour le fil d'Ariane
    strategy: "automatic"
  },
};


// export const environment = {
//   production: true,
//   apiUrl: 'http://ciasecure.gabriel-cassano.be/api/v1/',
//   appName: 'CIA-SECURE',
//   appAcronym: 'AB',
//   appLogo: 'assets/images/logo.png',
//   breadcrum: {
//     enabled: true,
//     strategy: "automatic"
//   },
// };

