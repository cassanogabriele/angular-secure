// Importation des modules et classes Angular nécessaires
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
// Importation d'un service abstrait pour les pages de liste
import { AbstractListPageService } from 'src/app/lib/base-page/list-page/list-page.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

// Implémentation de l'interfaces OnInit 

export class HomePage extends AbstractListPageService implements OnInit {
  // Propriétés du composant

  // Style de liste, initialement défini à 2
  listStyle : number = 2;
  // Tableau de SafeHtml utilisé pour stocker des icônes sécurisées
  svgs : SafeHtml[] = [];

  // Constructeur du composant, injection des services nécessaires
  
  /*
  DomSanitizer : service fournit par Angular, qui offre des méthodes pour aider à sécuriser différentes valeurs afin de prévenir les 
  attaues XSS, qui se produisent lorsqu'un site web accepte et affiche des données non fiables d'une source externe sans prendre de 
  mesures appropriées, pouvant entraîner l'exécution de scripts malveillants.
  */
  constructor(private _router: Router, private sanitizer: DomSanitizer) { 
    // Appel du constructeur du service abstrait
    super(); 
  }

  // Événement déclenché lors de l'initialisation du composant
  ngOnInit(): void {
    // Appel de la méthode de tri avec la colonne 'title'
    this.Sort('title');
    // Parcours des données et sécurisation des icônes à l'aide du service DomSanitizer
    this.data.forEach((app: any) => {
      this.svgs.push(this.sanitizer.bypassSecurityTrustHtml(app.icon));
    });
  }

  // Méthode de tri des données en fonction d'une colonne spécifiée
  Sort(sort: string, filtered: boolean = false) {
    // Tri des données en fonction de la colonne spécifiée
    this.data.sort((a: any, b: any) => a[sort] > b[sort] ? 1 : -1);
  }  
}
