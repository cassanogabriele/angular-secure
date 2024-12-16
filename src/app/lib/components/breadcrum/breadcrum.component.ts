// Composant responsable de la gestion et de l'affichage du fil d'ariane (breadcrumb)

// Importation des modules Angular nécessaire
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BreadcrumOptions } from '../../enums/breadcrum.enum';
import { Breadcrum } from '../../interfaces/breadcrum.interface';
import { BreadcrumService } from '../../services/breadcrum/breadcrum.service';

// Définition du composant d'affichage du fil d'Ariane
@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
})

export class BreadcrumComponent implements OnInit, OnDestroy {
  // Propriétés

  // Liste des éléments du fil d'Ariane
  routeThree: Breadcrum[] = [];
  // Stratégie actuelle pour la génération du fil d'Ariane
  strategy: string = BreadcrumOptions.automatic;
  
  // Observable pour la destruction du composant
  private _destroy$ = new Subject();

  // Constructeur du composant, injection des services nécessaires
  constructor(public router: Router, private _cdk: ChangeDetectorRef, private _breadcrumService: BreadcrumService) {}

  // Méthode du cycle de vie Angular, appelée après la création du composant
  ngOnInit(): void {
    // Abonnement aux événements de navigation pour déterminer la stratégie du fil d'Ariane
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.determineStrategy(event);
    });
  }

  // Méthode du cycle de vie Angular, appelée lors de la destruction du composant
  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  // Méthode pour mettre à jour le fil d'Ariane à partir du service
  public updateBreadCrumbFromService(): any {
    this._breadcrumService.routes$.subscribe(r => this.routeThree = r);
    this._cdk.detectChanges();
  }

  // Méthode pour créer le fil d'Ariane à partir de l'URL
  private createBreadCrumbFromUrl(event: any): any {
    // Logique pour extraire les éléments du fil d'Ariane à partir de l'URL

    // Initialisation de la liste des éléments du fil d'Ariane
    this.routeThree = [];
    // Séparation de l'URL en segments en utilisant le caractère '/'
    const routes = event.url.split('/');
    let endPoint = '';

    // Parcours de chaque segment de l'URL
    routes.forEach((element:string) => {
      // Vérification pour exclure les segments vides et le segment 'home'
      if (element !== '' && element !== 'home') {
        // Construction de l'URL cumulatif jusqu'au segment actuel
        endPoint += `/${element}`;

        // Création d'un objet Breadcrum avec l'URL cumulatif et le label du segment
        const route: Breadcrum = { url: endPoint, label: element };
        // Ajout de l'objet Breadcrum à la liste des éléments du fil d'Ariane
        this.routeThree.push({ url: endPoint, label: element });
      }
    });

    this._cdk.detectChanges();
  }  

  // Méthode pour créer le fil d'Ariane automatiquement à partir des routes configurées
  private createBreadCrumbUrls(event: any): any {
    // Logique pour générer le fil d'Ariane automatiquement à partir des routes

    // Initialisation de la liste des éléments du fil d'Ariane
    this.routeThree = [];
    // Récupération de la configuration des routes de l'application
    const routesThree = this.router.config;
    // Nombre d'itérations basé sur le nombre de segments dans l'URL actuelle
    const iterationNumber = event.url.split('/').length;
    // Initialisation d'un tableau pour stocker les URLs générées
    const urls = [];
    // URL actuelle
    const currentUrl = event.url;
    // Détermination de l'index des routes en fonction de l'URL actuelle
    const routesIndex: number = this.defineRoutesIndex(routesThree, currentUrl);
    // Récupération des routes à l'index déterminé
    const routes = (routesThree[routesIndex] as any);

    // Vérifier si la route existe
    if (!routes)
      return;

    // La route n'a pas d'enfants
    if (!routes._loadedRoutes) {
      // Logique pour ajouter la route à la liste du fil d'Ariane
      if(routes.path === '' || routes.path === 'home')
        this.routeThree.push({ label: "Acceuil", url: this.getUrlToNavigate("/" + routes.path) });
      else
        this.routeThree.push({ label: routes.path, url: this.getUrlToNavigate("/" + routes.path) });
    }

    // La route a des enfants
    if (routes._loadedRoutes) {
      for (let index = 1; index < iterationNumber; index++) {
        // Nombre de routes chargées pour la route actuelle
        const loadedRoutesNumber = routes._loadedRoutes.length;
        // Segment de l'URL actuelle
        const currentUrlPart = currentUrl.split('/')[index];
        // Routes chargées pour la route actuelle
        const loadedRoutes = routes._loadedRoutes;

        // Logique pour ajouter les éléments du fil d'Ariane en fonction des routes chargées

        // Vérifier si l'index de l'itération est égal à 1 (deuxième segment de l'URL) et s'il existe 
        // une route chargée avec un chemin vide
        if(index === 1 && loadedRoutes.find((x:any) => x.path === '')){
          // Création d'un objet Breadcrum avec le label du segment actuel et l'URL cumulatif jusqu'à ce segment
          const breadcrumItem : Breadcrum = { label: currentUrlPart, url: currentUrlPart };
          // Ajout de cet objet Breadcrum à la liste routeThree, représentant ainsi le premier élément du fil d'Ariane
          this.routeThree.push(breadcrumItem)
        }

        // Vérifier si la route chargée correspond au segment actuel de l'URL
        if(loadedRoutes.find((x:any) => x.path === currentUrlPart)){
          // Récupèrer le chemin de la route correspondante dans la liste des routes chargées
          const path = loadedRoutes.find((x:any) => x.path === currentUrlPart).path;
          //  Créer un objet Breadcrum avec le label correspondant au chemin de la route et l'URL cumulatif jusqu'à cette route
          const breadcrumItem : Breadcrum = { label: path, url: this.getUrlToNavigate("/" + path) };
          this.routeThree.push(breadcrumItem)
        }
      }
    }

    // Déclenchement de la détection des changements pour mettre à jour la vue
    this._cdk.detectChanges();
  }

  // Méthode pour déterminer l'index des routes en fonction de l'URL actuelle
  private defineRoutesIndex(routes: any, currentUrl: string) {
    // Si la route actuelle est la page d'accueil ou la page de destination
    if (currentUrl === '/' || currentUrl === '/home') {
      return 0;
    }

    // Si la première route peut avoir un paramètre (ex: /:username)
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path.includes(':') && currentUrl.split('/').length === 2) {
        return 0;
      }
    }

    // Si la route actuelle n'est ni la page d'accueil ni la page de destination, c'est une route enfant
    if (currentUrl.split.length > 1) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === currentUrl.split('/')[1]) {
          return i;
        }
      }
    }

    // La route n'est pas trouvée
    return -1;
  }

  // Méthode pour construire l'URL à naviguer en fonction du fil d'Ariane existant
  private getUrlToNavigate(url: string) {
    let urlToNavigate = '';

    // Si le fil d'Ariane est vide, retourne l'URL fourni sans modification
    if(this.routeThree.length === 0){
      return url;
    }

    // Parcourt des éléments du fil d'Ariane et construit l'URL de navigation
    for (let index = 0; index < this.routeThree.length; index++) {
      const route = this.routeThree[index];
      urlToNavigate += route.url;
    }

    // Ajout de l'URL fourni en paramètre à l'URL construit à partir du fil d'Ariane
    urlToNavigate += url;

    // Retourner l'URL de navigation complète
    return urlToNavigate;
  }
 
  // Déterminer la stratégie de génération du fil d'ariane en fonction de la configuration définie dans l'environnement
  private determineStrategy(event:NavigationEnd): void {
    // Récupération de la stratégie depuis l'environnement ou utilisation de la stra
    this.strategy = environment.breadcrum.strategy || BreadcrumOptions.automatic;

    // Déterminer l'action en fonction de la stratégie
    switch (this.strategy) {
      // Stratégie automatique : génération du fil d'Ariane à partir des routes
      case BreadcrumOptions.automatic:
        this.createBreadCrumbUrls(event);
        break;
      // Stratégie basée sur un service : mise à jour du fil d'Ariane à partir d'un service
      case BreadcrumOptions.service:
        this.updateBreadCrumbFromService();
        break;
      // Stratégie basée sur l'URL : génération du fil d'Ariane à partir de l'URL
      case BreadcrumOptions.url:
        this.createBreadCrumbFromUrl(event);
        break;
    }
  }
}
