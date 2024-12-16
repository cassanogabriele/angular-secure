// Composant représentant un bouton de type amburger pour activer ou désactiver un menu latéral

// Import du module CommonModule depuis Angular et des éléments nécessaires pour créer un composant
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { menu } from '../../enums/menu.enum';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss'],
})

export class HamburgerButtonComponent {
  // Événement de sortie pour informer le composant parent de l'état du menu (ouvert ou fermé)
  @Output() menuStatus = new EventEmitter<string>();

  // Constructeur du composant
  constructor() {
    // Émettre l'état initial du menu (fermé) lors de la création du composant
    this.menuStatus.emit(menu.closed);
  }

  // Méthode appelée lors du clic sur le bouton hamburger
  onClickButton(){
    // Sélectionner le bouton à l'aide de son identifiant
    const button =  document.querySelector("#hamburger-button");

    // Vérifier si le bouton existe
    if(button){
      // Basculer la classe "opened" pour gérer l'état visuel du bouton
      button.classList.toggle("opened");
      // Mettre à jour l'attribut aria-expanded pour l'accessibilité
      button.setAttribute("aria-expanded", button.classList.contains("opened").toString());
    }

    // Émettre l'état actuel du menu en fonction de l'attribut aria-expanded
    if(button?.getAttribute("aria-expanded") === "true")
      this.menuStatus.emit(menu.opened);
    else
      this.menuStatus.emit(menu.closed);
  }
}
