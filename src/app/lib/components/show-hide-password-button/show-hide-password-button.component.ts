// Composant représentant un bouton permettant de basculer entre l'affichage et le masquage du contenu d'un champ de mot de passe

// Import du module CommonModule depuis Angular et des éléments nécessaires pour créer un composant
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-show-hide-password-button',
  templateUrl: './show-hide-password-button.component.html',
  styleUrls: ['./show-hide-password-button.component.scss'],
})

export class ShowHidePasswordButtonComponent {
  // Propriété d'entrée pour définir l'ID du champ de mot de passe associé
  @Input() inputId = "";
  // Propriété pour suivre l'état d'affichage du mot de passe (true pour afficher, false pour masquer)
  show: boolean;
  // Propriété pour stocker l'année en cours
  readonly currentYear = new Date().getFullYear();

  // Constructeur du composant
  constructor() {
    // Initialisation de la propriété 'show' à true (afficher le mot de passe par défaut)
    this.show = true;
  }

  // Méthode appelée lors du clic sur l'icône du bouton
  onClickIcon(): void {
    // Récupération de l'élément du champ de mot de passe par son ID
    const input = document.getElementById(this.inputId)
    
    if(input){
      // Basculer entre le type 'password' et 'text' pour afficher ou masquer le mot de passe
      if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
      } else {
        input.setAttribute("type", "password");
      }
    }

    // Inverser l'état d'affichage du mot de passe
    this.show = !this.show;
  }
}
