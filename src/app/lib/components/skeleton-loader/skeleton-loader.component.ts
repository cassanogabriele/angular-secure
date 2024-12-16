// Composant utilise pour afficher des indicateurs de chargement (squelette) dans une interface utilisateur 
// pendant que le contenu réel est en cours de récupération

// Import du module CommonModule depuis Angular et des éléments nécessaires pour créer un composant
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})

export class SkeletonLoaderComponent {
  // Propriété d'entrée pour indiquer si le squelette est utilisé dans une table
  @Input() table:boolean;
 // Propriété d'entrée pour indiquer si le squelette est utilisé dans une fiche
  @Input() fiche:boolean;

 // Constructeur du composant
  constructor() {
    // Initialisation des propriétés 'fiche' et 'table' à false par défaut
    this.fiche = false;
    this.table = false;
  }
}
