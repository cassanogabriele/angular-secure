## Application exemple : Front End Angular pour l'API CodeIgniter

# Démarrage de l'application 

ng serve --open

# Installation d'Angular CLI 

npm install -g @angular/cli

# Installation des dépendances du projet (se positionner à l'endoit ou se trouve l'application)

npm install

# Lancer l'application avec ouverture directe depuis un navigateur

ng serve --open

###############################################################################################################################################################################################################################################################################################################################################################################

## Commandes Angular 

## Création d'un nouveau projet 

ng new "nom-projet"

## Génération d'un composant 

ng g component "nom-composant"

## Génération d'une page



## Génération d'une classe 

ng g class "nom-classe"

## Génération d'un service 

ng g service "nom_service"

## Générer un module 

ng generate module "nom-module"

## Générer un composant dans le module 

ng generate component "nom_module"/"non_composant"

## Intégrer une bibliothèque

npm install "nom_librairie" 

##############################################################################################################################################################################################################################################################################################################################################################################

## Architecture d'un projet 

## Le Composant (Component)

C'est un bloc de code réutilisable, on peut emboîter les composants les un dans les autres.

## Le Composant racine 

Lors de la création d'une application, on part toujours d'un composant racine "app.component", 
qui représente l'ensemble de l'application. Il contiendra des sous-composants : menu, corps de la page, 
body, navbar. Les composants peuvent contenir des sous-composants. Un composant représente un bout 
d'interface de l'application, on décide de ce que l'on met dans un composant.

## Structure d'un composant 

## Le répertoire src 

Contient les fichiers sources de l'application, le fichier "index.html" est le fichier racine de l'application. 

## Balise pour déclarer un composant

Elle est présente dans le fichier "index.html" du dossier "src", c'est le composant de base de l'application. 
Elle fait référence au répertoire "app".

<app-root></app-root> 

## Le répertoire "app"

Il contient le fichier "app-routing.module.ts", qui met en place le routeur. 
Il contient aussi le fichier "app.module.ts" est un fichier de configuration qui indique à Angular 
comment assembler l'application. On a plusieurs fichiers "app.component", qui constituent un seul 
composant, qui s'organise en 4 fichiers : HTML, CSS, JavaScript et le fichier pour les tests unitaires. 

## La création d'un nouveau composant 

Cela crée un dossier contenant un fichier HTML, un fichier "ts" (fichier TypeScript" et un fichier CSS.

## Les modules 

Ils facilitent la réutilisation et le partage. Chaque application Angular possède au moins un module : "app.module", dans le fichier "app.module.ts". 
Un module est un mécanisme permettant de regrouper des composants, des services, des directives, des pipe; de définir les dépendances et leur visibilité. 
Une module est définit grâce à son décorateur "@NgModule", qui possède plusieurs propriétés, et une class AppMod

## Utiliser le module et le composant 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonModuleModule } from './mon-module/mon-module.module'; // Importez votre module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MonModuleModule // Ajoutez votre module ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

## Utiliser le composant du module dans un fichier HTML 

<app-mon-composant></app-mon-composant>

## Les directives 

Une directive est une classe qui vient ajouter du comportement à un lément sur lequel est posée.

## Les directives structurelles

Elles ont pour but de modifier le DOM, en plaçant un élément dans le DOM. "*ngIf" permettra de faire apparître un élément selon une condition et "*ngFor" donnera la possibilité
de dupliquer des éléments. 

## *ngIf

<div *ngIf="age >= 18; else contenuAutre">
  Vous êtes majeur.
</div>

<div *ngIf="condition">
  <!-- Contenu à afficher lorsque la condition est vraie -->
</div>

<ng-template #contenuAutre>
  Vous êtes mineur.
</ng-template>

## *ngFor

<ul>
  <li *ngFor="let item of maCollection">{{ item }}</li>
</ul>


On peut obtenir l'index de l'élément actuel en utilsiant "$index". 

<ul>
  <li *ngFor="let item of maCollection; let i = index">{{ i }}: {{ item }}</li>
</ul>


On peut itérer sur les paries "clé-valeur" d'un objet. 

<div *ngFor="let key of Object.keys(monObjet)">
  {{ key }}: {{ monObjet[key] }}
</div>

## Les directives d'attribut 

## La directive ngModel

## La méthode Two-way

C'est une liaison bidirectionnelle, qui est une fonctionnalité, qui permet de synchroniser automatiquement les données entre le modèle de l'application et la vue de manière 
bidirectionnelle. Lorsqu'on modifie les données dans le modèle, la vue est automatiquement mise à jour, et quand on modifie les données dans la vue, le modèle, est également mis à jour.


## Importation du modèle dans le fichier "app.module.ts"

On doit ajouter cette importation dans le module où on va utiliser "ngModel". 


import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // ...
    FormsModule // Ajoutez FormsModule ici
  ],
  declarations: [
    // ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

## Utilisation dans le modèle HTML 

"nomDeLaPropriete" : propriété du modèle de composant qu'on souhaite lier au champ de saisie. Elle est automatiquement mis à jour quand l'utilisateur saisit quelque chose 
et si on modifie "nomDeLaPropriete" dans le code TypeScript, le champ de saisie sera automatiquement mis à jour. 

<input [(ngModel)]="nomDeLaPropriété">

## La directive ngClass 

Elle permet de définir dynamiquement les classes CSS pour un élément HTML, en fonction des valeurs des propriétés dans le modèle du composant TypeScript. 


## Dans le modèle HTML

<div [ngClass]="{'classe1': condition1, 'classe2': condition2}">
  Cet élément a des classes dynamiques.
</div>

## Dans le composant TypeScript 

export class MonComposantComponent {
  condition1 = true;
  condition2 = false;
}

## Le routeur 

Au démarrage, il n'y a qu'un seul chargement de page, au lieu de charger une nouvelle page, Angular remplace le contenu ou une partie du contenu de la page, 
en modifiant les composants qui y sont affichés. 


## Configurer des routes

Angular utilise le "RouterModule" pour configurer des routes, il faut d'abord l'importer et le configurer dans l'application. 


## Important du module dans "app.module.ts" 

import { RouterModule, Routes } from '@angular/router';


## Tableau de routes définissant chaque route, abec un objet de configuration 

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route par défaut
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
];


## Utilisation "RouterModule.forRoot(routes" dans le tableau "imports" de "@NgModule"

@NgModule({
  declarations: [ // ...
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configuration des routes principales
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


## Création de liens de navigation dans le fichier HTML 

<nav>
  <ul>
    <li><a routerLink="/">Accueil</a></li>
    <li><a routerLink="/page1">Page 1</a></li>
    <li><a routerLink="/page2">Page 2</a></li>
  </ul>
</nav>


## Afficher les composants associés aux routes 

<router-outlet></router-outlet>

## Créer une route avec des paramètres

Cela se fait dans "app.routing.module.ts".

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

## Utiliser le paramètre dans le composant 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      // Vous pouvez maintenant utiliser this.userId dans votre composant
    });
  }
}


## Créer des redirections 

## app-routing.module.ts

L'url '/home' est associée au composant "HomeComponent". 
La route { path: 'liste', redirectTo: '', pathMatch: 'full' } configure la redirection de l'URL "liste" vers l'URL racine (''). 
La pathMatch: 'full' indique que la redirection ne doit être activée que si l'URL correspond exactement à "liste". Si vous ne précisez pas pathMatch: 'full'.
La route { path: '', redirectTo: 'home', pathMatch: 'full' } redirige l'URL racine vers la page d'accueil.
La route { path: '**', redirectTo: 'home' } gère toutes les autres URL non valides en les redirigeant également vers la page d'accueil.


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Redirection de "liste" vers l'URL racine
  { path: 'liste', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

## Les observables 

C'est un objet qui emet des informations auquelles on souhaite réagir. On lui associe un "observer" qui est un bloc de code qui sera exécuté
à chaque fois que l'observable émet une information. L'observable émet 3 types d'information : des données, une erreur, 
un message "complete". Un observable est utilisé pour gérer les flux de données asynchrones. 

## Récupérer des données à partir d'une API 

## Importation des modules nécessaires dans le service 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Création d'un service qui dépend du service HttpClient pour effectuer une requête GET vers un API. 
export class DataService {
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données à partir de l'API, elle retourne un observable qui émettra les données récupérées lorsque la requête sera terminée.
  getData(): Observable<any> {
    // Utilisation de HttpClient pour faire une requête GET à l'API
    return this.http.get('https://api.example.com/data');
  }
}

## HttpClient 

## Créer des requêtes avec HttpClient 

On va communiquer avec un serveur grâce à Angular HttpClient, l'objectif sera de récupérer les données sur un serveur
placé dans Firebase, les données sont stockées au format JSON. 

## Importation de HttpClient dans le service 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données depuis une API
  getData(): Observable<any> {
    const apiUrl = 'https://api.example.com/data'; // Remplacez par l'URL de votre API
    return this.http.get(apiUrl);
  }
}



##############################################################################################################################################################################################################################################################################################################################################################################

## Pratiques

## Importation d'un composant 

Dans le fichier TypeScript où on souhaite utiliser le composant. 

import { NomDuComposant } from './chemin/vers/le/composant';

## Utilisation du composant 

Il faut ajouter le sélecteur du composant au modèle HTML où on souhaite afficher le composant. 

<nom-du-composant></nom-du-composant>

## Afficher le contenu d'une variable (string d'interpolation)

<h2>{{ title }}</h2>

## Importation du composant dans le module de l'application "app.module.ts" 

Il faut ajouter le composant à la liste des déclarations "declarations", dans le décorateur @NgModule, utilisé pour définir un module. Les modules regroupent 
des fonctionnalités liés : composants, services, directives, etc. 

import { NomDuComposant } from './chemin/vers/le/composant';

@NgModule({
  declarations: [
    // ...
    NomDuComposant,
    // ...
  ],
  // ...
})



