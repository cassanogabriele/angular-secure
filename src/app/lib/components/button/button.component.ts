// Composant qui prend en charge une propriété "type" qui peut être utilisée pour définir le type de bouton

// Import des modules nécessaires d'Angular.
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// Import l'énumération "ButtonType" depuis le fichier correspondant
import { ButtonType } from '../../enums/button-type.enum';

// Définit le sélecteur, le modèle et les styles du composant.
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

// Définit la classe qui implémente l'interface "AfterViewInit"
export class ButtonComponent implements AfterViewInit {
  // Propriété d'entrée type qui peut être de type ButtonType ou une chaîne de caractères
  @Input() type : ButtonType | string;

  // Initialisation de la classe du composant
  constructor() {}

  // Implémentation de la méthode du cycle de vie, appelée après que la vue du composant a été initialisée
  ngAfterViewInit(): void {
    // Vérifier si le type est indéfini ou s'il ne fait pas partie des valeurs de ButtonType
    if(this.type === undefined || !Object.values(ButtonType).toString().includes(this.type)){
      // Si c'est le cas, définit le type par défaut à "ButtonType.create"
      this.type = ButtonType.create;
    }
  }
}
